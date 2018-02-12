require 'issue_tracker/models/mysql/property'

class Model

  extend Property

  ###############################
  def self.create(options)
    DB_Mysql.con.query(
        "INSERT INTO #{options[:table]} (#{options[:fields].keys.join(', ')}) " +
            "VALUES (#{options[:fields].values.map{|v| "'#{v}'"}.join(", ")})"
    )
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
      p[:options].each do |k,v|
        commands << 'NOT NULL'        if k == :required && v
        commands << 'UNIQUE'          if k == :unique && v
        commands << 'UNSIGNED'        if k == :unsigned && v
        commands << 'PRIMARY KEY'     if k == :primary_key && v
        commands << 'AUTO_INCREMENT'  if k == :auto_increment && v
        commands << "DEFAULT #{v}"    if k == :default && (p[:type] == Boolean || p[:type] == Integer)
        commands << "DEFAULT '#{v}'"  if k == :default && p[:type] == String
      end
      max = "(#{p[:options][:max]})" if p[:options][:max]
      "#{p[:name]} #{p[:type].to_s}#{max} #{commands.join(' ')}"
    }.join(', ')

    keys = []
    properties.each {|p| keys << p[:name] if p[:options][:key]}
    keys = keys.empty? ? '' : ", PRIMARY KEY(#{keys.join(',')})"
    puts "CREATE TABLE IF NOT EXISTS #{self.name.downcase} (#{columns}#{keys})"
    DB_Mysql.con.query("CREATE TABLE IF NOT EXISTS #{self.name.downcase} (#{columns}#{keys})")
  end
end