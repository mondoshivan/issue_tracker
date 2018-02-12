

class Sprint < Model

  attr_reader :id
  attr_reader :start
  attr_reader :end

  ###############################
  def self.create_table
    DB_Mysql.con.query(<<eos)
    CREATE TABLE IF NOT EXISTS sprint (
    id INTEGER(6) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    start DATE NOT NULL,
    end DATE NOT NULL
    )
eos
  end

  ################################
  def self.create(**options)
    options[:table] = 'sprint'
    options[:fields][:start] = options[:fields][:start].strftime('%d-%m-%y')
    options[:fields][:end] = options[:fields][:end].strftime('%d-%m-%y')
    super(options)
    Sprint.last(options[:fields])
  end

  ################################
  def self.all(**fields)
    where = ''
    where += "sprint.id='#{fields[:id]}' AND " if fields[:id]
    where += "sprint.start='#{fields[:start]}' AND " if fields[:start]
    where += "sprint.end='#{fields[:end]}' AND " if fields[:end]
    where = "WHERE #{where[0..-5]}" unless where.empty?
    rs = DB_Mysql.con.query("SELECT * FROM sprint #{where}")

    created = []
    rs.num_rows.times { created << Sprint.new(rs.fetch_row) }
    created
  end

  ################################
  def self.first(**fields)
    Sprint.all(fields)[0]
  end

  ################################
  def self.last(**fields)
    Sprint.all(fields)[-1]
  end

  ###############################
  def initialize(values=[])
    @id = values[0]
    @start = values[1]
    @end = values[2]
  end
end