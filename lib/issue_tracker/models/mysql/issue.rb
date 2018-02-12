require 'issue_tracker/models/mysql/model'

class Issue < Model

  property :project_id, Integer, max: 6, unsigned: true, required: true, key: true
  property :name, Varchar, max: 25, required: true
  property :description, Text
  property :parent, Integer, max: 6, unsigned: true
  property :type, Integer, max: 3, unsigned: true, required: true
  property :project, Integer, max: 3, unsigned: true, required: true, key: true
  property :state, Integer, max: 3, unsigned: true, required: true
  property :sprint, Integer, max: 6, unsigned: true
  property :user_assigned, Integer, max: 6, unsigned: true, required: true
  property :user_created, Integer, max: 6, unsigned: true, required: true

  ################################
  def self.create(**options)
    options[:fields] = {}.merge(options[:fields])
    options[:table] = 'issue'
    options[:fields][:user_assigned] = User.first(acronym: options[:fields][:user_assigned]).id
    options[:fields][:user_created] = User.first(acronym: options[:fields][:user_created]).id
    super(options)
    Issue.last(options[:fields])
  end

  ################################
  def self.all(**fields)
    where = ''
    where += "issue.project_id=#{fields[:project_id]} AND " if fields[:project_id]
    where += "issue.name='#{fields[:name]}' AND " if fields[:name]
    where += "issue.parent=#{fields[:parent]} AND " if fields[:parent]
    where += "issue.type=#{fields[:type]} AND " if fields[:type]
    where += "issue.project=#{fields[:project]} AND " if fields[:project]
    where += "issue.state=#{fields[:state]} AND " if fields[:state]
    where += "issue.sprint=#{fields[:sprint]} AND " if fields[:sprint]
    where += "issue.user_assigned=#{fields[:user_assigned]} AND " if fields[:user_assigned]
    where += "issue.user_created=#{fields[:user_created]} AND " if fields[:user_created]
    where = "WHERE #{where[0..-5]}" unless where.empty?
    rs = DB_Mysql.con.query("SELECT * FROM issue #{where}")

    created = []
    rs.num_rows.times { created << User.new(rs.fetch_row) }
    created
  end

  ################################
  def self.first(**fields)
    Issue.all(fields)[0]
  end

  ################################
  def self.last(**fields)
    Issue.all(fields)[-1]
  end

  ###############################
  def initialize(values=[])
    @project_id = values[0]
    @name = values[1]
    @description = values[2]
    @parent = values[3]
    @type = values[4]
    @project = values[5]
    @state = values[6]
    @sprint = values[7]
    @user_assigned = values[8]
    @user_created = values[9]
  end

end