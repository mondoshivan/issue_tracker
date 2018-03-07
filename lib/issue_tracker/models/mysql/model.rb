require 'digest'

require 'issue_tracker/models/mysql/data_types/integer'
require 'issue_tracker/models/mysql/data_types/boolean'
require 'issue_tracker/models/mysql/data_types/varchar'
require 'issue_tracker/models/mysql/data_types/text'


class Model

  ################################
  def self.create_property(*args)
    {
        name: args[0],
        type: args[1],
        options: args[2] ||= {}
    }
  end

  ################################
  def self.property(*args)
    self.properties << self.create_property(*args)
  end

  ################################
  def self.properties
    @properties ||= []
  end

  ################################
  def self.properties=(p)
    @properties = p
  end

  ################################
  def self.property_with_name(name)
    self.properties.each do |p|
      return p if p[:name] == name
    end
  end

  ###############################
  def self.create(fields)
    query = "INSERT INTO #{self.name.downcase} (#{fields.keys.join(', ')}) " +
        "VALUES (#{fields.values.map.with_index { |v, i|
          property_name = fields.keys[i]
          property = self.property_with_name(property_name)
          v = self.checksum(v, property[:options][:checksum]) if property[:options].key?(:checksum)

          if property[:type] == Boolean
            "#{v}"
          elsif property[:type] == Date
            "'#{v.strftime('%d-%m-%y')}'"
          else
            "'#{v}'"
          end
        }.join(", ")})"
    DB_Mysql.con.query(query)
    self.last(fields)
  end

  ###############################
  def self.drop_table
    DB_Mysql.con.query(<<eos)
    DROP TABLE IF EXISTS #{self.name.downcase};
eos
  end

  ###############################
  def self.create_table
    default_key = true
    columns = self.properties.map {|p|
      commands = []
      commands << 'UNSIGNED'                            if p[:options][:unsigned]
      commands << 'NOT NULL'                            if p[:options][:required]
      commands << 'UNIQUE'                              if p[:options][:unique]
      commands << 'AUTO_INCREMENT'                      if p[:options][:auto_increment]
      commands << "DEFAULT #{p[:options][:default]}"    if p[:options][:default] != nil && (p[:type] == Boolean || p[:type] == Integer)
      commands << "DEFAULT '#{p[:options][:default]}'"  if p[:options][:default] != nil && p[:type] == String

      if p[:options][:primary_key]
        commands << 'PRIMARY KEY'
        default_key = false
      end

      if p[:options][:max]
        max = "(#{p[:options][:max]})"
      elsif p[:options][:checksum] && p[:options][:checksum].downcase == 'md5'
        max = '(32)'
      else
        max = ''
      end

      "#{p[:name]} #{p[:type].to_s}#{max} #{commands.join(' ')}"
    }.join(', ')

    keys = self.properties.clone.delete_if { |p| !(p[:options][:key])}.map {|p| p[:name]}

    # prepare the default key
    if keys.empty? && default_key
      columns = "id INTEGER UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT, #{columns}"
      self.properties.unshift(self.create_property(:id, Integer, unsigned: true, primary_key: true, auto_increment: true))
    end

    keys = keys.empty? ? '' : ", PRIMARY KEY(#{keys.join(',')})"

    puts "CREATE TABLE IF NOT EXISTS #{self.name.downcase} (#{columns}#{keys})"
    DB_Mysql.con.query("CREATE TABLE IF NOT EXISTS #{self.name.downcase} (#{columns}#{keys})")
  end

  ################################
  def self.checksum(string, checksum_type)
    if checksum_type
      return Digest::MD5.hexdigest(string) if checksum_type == 'md5'
    else
      raise "illegal checksum type: #{checksum_type}"
    end
  end

  ################################
  def self.where(**fields)
    where = ''
    fields.each do |name, value|
      property = self.property_with_name(name)
      value = self.checksum(value, property[:options][:checksum]) if property[:options].key?(:checksum)
      where += "#{self.name.downcase}.#{name}='#{value}' AND "
    end
    return "WHERE #{where[0..-5]}" unless where.empty?
  end

  ################################
  def self.all(**fields)
    sql = "SELECT * FROM #{self.name.downcase} #{self.where(**fields)}"
    rs = DB_Mysql.con.query(sql)

    created = []
    rs.num_rows.times { created << self.new(rs.fetch_row) }
    created
  end

  ################################
  def self.first(**fields)
    self.all(fields)[0]
  end

  ################################
  def self.last(**fields)
    self.all(fields)[-1]
  end

  #################################
  def self.create_getter(method_name, variable)
    define_method method_name do
      instance_variable_get(variable)
    end
  end

  #################################
  def self.max(property, **fields)
    sql = "SELECT MAX(#{property}) FROM #{self.name.downcase} #{self.where(**fields)}"
    rs = DB_Mysql.con.query(sql)

    return rs.num_rows == 1 ? rs.fetch_row[0] : nil
  end

  #################################
  def self.min(property, **fields)
    sql = "SELECT MIN(#{property}) FROM #{self.name.downcase} #{self.where(**fields)}"
    rs = DB_Mysql.con.query(sql)

    return rs.num_rows == 1 ? rs.fetch_row[0] : nil
  end

  #################################
  def self.avg(property, **fields)
    sql = "SELECT AVG(#{property}) FROM #{self.name.downcase} #{self.where(**fields)}"
    rs = DB_Mysql.con.query(sql)

    return rs.num_rows == 1 ? rs.fetch_row[0] : nil
  end

  #################################
  def self.sum(property, **fields)
    sql = "SELECT SUM(#{property}) FROM #{self.name.downcase} #{self.where(**fields)}"
    rs = DB_Mysql.con.query(sql)

    return rs.num_rows == 1 ? rs.fetch_row[0] : nil
  end

  #################################
  def self.count(property, **fields)
    sql = "SELECT COUNT(#{property}) FROM #{self.name.downcase} #{self.where(**fields)}"
    rs = DB_Mysql.con.query(sql)

    return rs.num_rows == 1 ? rs.fetch_row[0] : nil
  end

  ################################
  def initialize(values)
    values.each_with_index do |v,i|
      name = self.class.properties[i][:name]
      v = v.to_i == 1 if self.class.properties[i][:type] == Boolean
      v = v.to_i      if self.class.properties[i][:type] == Integer
      v = Time.new(v) if self.class.properties[i][:type] == Date
      instance_variable_set("@#{name}", v)
      Model.create_getter(name, "@#{name}")
    end
  end

  ################################
  def to_json(a)
    hash = {}
    instance_variables.each do |name|
      hash[name.to_s.gsub(/^@/, '')] = instance_variable_get(name)
    end
    hash.to_json
  end
end