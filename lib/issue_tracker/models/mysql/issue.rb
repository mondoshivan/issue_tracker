require 'issue_tracker/models/mysql/model'

class Issue < Model

  attr_reader :project_id
  attr_reader :name
  attr_reader :description
  attr_reader :parent
  attr_reader :type
  attr_reader :project
  attr_reader :state
  attr_reader :sprint
  attr_reader :user_assigned
  attr_reader :user_created

  ###############################
  def self.create_table
    DB_Mysql.con.query(<<eos)
    CREATE TABLE IF NOT EXISTS issue (
        project_id INTEGER(6) UNSIGNED NOT NULL,
        name VARCHAR(25) NOT NULL,
        description TEXT,
        parent INTEGER(6) UNSIGNED,
        type INTEGER(3) UNSIGNED NOT NULL,
        project INTEGER(3) UNSIGNED NOT NULL,
        state INTEGER(3) UNSIGNED NOT NULL,
        sprint INTEGER(6) UNSIGNED,
        user_assigned INTEGER(6) UNSIGNED NOT NULL,
        user_created INTEGER(6) UNSIGNED NOT NULL,
        PRIMARY KEY(project, project_id)
    )
eos
  end

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