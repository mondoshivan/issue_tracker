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
        commands << 'NOT NULL'      if k == :required && v
        commands << 'UNIQUE'        if k == :unique && v
        commands << "DEFAULT #{v}"  if k == :default && p[:type] == Boolean
        commands << "DEFAULT '#{v}'"  if k == :default && p[:type] == String
      end

      "#{p[:name]} #{p[:type].to_s} #{commands.join(' ')}"
    }.join(',')

    puts "CREATE TABLE IF NOT EXISTS #{self.name.downcase} (#{columns})"
    exit 0
    DB_Mysql.con.query("CREATE TABLE IF NOT EXISTS #{self.name.downcase} (#{columns})")

#         id INTEGER(6) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
#         first VARCHAR(25) NOT NULL,
#         second VARCHAR(25) NOT NULL,
#         acronym VARCHAR(25) NOT NULL UNIQUE,
#         admin Boolean NOT NULL DEFAULT false
#     )
# eos
  end
end