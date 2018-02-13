require 'issue_tracker/models/mysql/property'

class Model

  extend Property

  ###############################
  def self.create(fields)
    query = "INSERT INTO #{self.name.downcase} (#{fields.keys.join(', ')}) " +
        "VALUES (#{fields.values.map.with_index { |v, i|
          property_name = fields.keys[i]
          property = property_with_name(property_name)

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
    columns = properties.map {|p|
      commands = []
      commands << 'UNSIGNED'                            if p[:options][:unsigned]
      commands << 'NOT NULL'                            if p[:options][:required]
      commands << 'UNIQUE'                              if p[:options][:unique]
      commands << 'PRIMARY KEY'                         if p[:options][:primary_key]
      commands << 'AUTO_INCREMENT'                      if p[:options][:auto_increment]
      commands << "DEFAULT #{p[:options][:default]}"    if p[:options][:default] != nil && (p[:type] == Boolean || p[:type] == Integer)
      commands << "DEFAULT '#{p[:options][:default]}'"  if p[:options][:default] != nil && p[:type] == String

      max = p[:options][:max] ? "(#{p[:options][:max]})" : ''
      "#{p[:name]} #{p[:type].to_s}#{max} #{commands.join(' ')}"
    }.join(', ')

    keys = properties.clone.delete_if { |p| !(p[:options][:key])}.map {|p| p[:name]}
    keys = keys.empty? ? '' : ", PRIMARY KEY(#{keys.join(',')})"
    DB_Mysql.con.query("CREATE TABLE IF NOT EXISTS #{self.name.downcase} (#{columns}#{keys})")
  end

  ################################
  def self.all(**fields)
    where = ''
    fields.each do |name, value|
      where += "#{self.name.downcase}.#{name}='#{value}' AND "
    end
    where = "WHERE #{where[0..-5]}" unless where.empty?
    sql = "SELECT * FROM #{self.name.downcase} #{where}"
    rs = DB_Mysql.con.query(sql)

    created = []
    rs.num_rows.times { created << self.new(rs.fetch_row, properties) }
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

  ################################
  def initialize(values, properties)
    values.each_with_index do |v,i|
      name = properties[i][:name]
      v = v.to_i == 1 if properties[i][:type] == Boolean
      v = v.to_i      if properties[i][:type] == Integer
      v = Time.new(v) if properties[i][:type] == Date
      instance_variable_set("@#{name}", v)
      define_singleton_method(name) { instance_variable_get("@#{name}") }
    end
  end

  ################################
  def to_json(a)
    hash = {}
    instance_variables.each do |name|
      hash[name.to_s] = instance_variable_get(name)
    end
    hash.to_s
  end
end