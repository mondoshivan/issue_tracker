require 'issue_tracker/models/mysql/model'

class User < Model

  property :id, Serial, required: true
  property :first, String, required: true
  property :second, String, required: true
  property :acronym, String, required: true, unique: true
  property :admin, Boolean, required: true, default: false


  ################################
  def self.create(**options)
    options[:fields] = {admin: 0}.merge(options[:fields])
    options[:fields][:admin] = options[:fields][:admin] ? 1 : 0
    options[:table] = 'user'
    super(options)
    User.last(options[:fields])
  end

  ################################
  def self.all(**fields)
    where = ''
    where += "user.id='#{fields[:id]}' AND "           if fields[:id]
    where += "user.first='#{fields[:first]}' AND "     if fields[:first]
    where += "user.second='#{fields[:second]}' AND "   if fields[:second]
    where += "user.acronym='#{fields[:acronym]}' AND " if fields[:acronym]
    where += "user.admin=#{fields[:admin]} AND "       if fields[:admin]
    where = "WHERE #{where[0..-5]}" unless where.empty?
    rs = DB_Mysql.con.query("SELECT * FROM user #{where}")

    created = []
    rs.num_rows.times { created << User.new(rs.fetch_row) }
    created
  end

  ################################
  def self.first(**fields)
    User.all(fields)[0]
  end

  ################################
  def self.last(**fields)
    User.all(fields)[-1]
  end

  ###############################
  def initialize(values=[])
    # @id = values[0]
    # @first = values[1]
    # @second = values[2]
    # @acronym = values[3]
    # @admin = values[4] == '1'
  end

end