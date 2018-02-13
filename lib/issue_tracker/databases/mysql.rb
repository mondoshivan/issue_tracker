
require 'mysql'
require 'issue_tracker/databases/database'
require 'issue_tracker/models/mysql/user'
require 'issue_tracker/models/mysql/issue'
require 'issue_tracker/models/mysql/sprint'
require 'issue_tracker/models/mysql/project'
require 'issue_tracker/models/mysql/state'
require 'issue_tracker/models/mysql/type'
require 'issue_tracker/models/mysql/project_member'

# Mysql Ruby Tutorial:
# http://zetcode.com/db/mysqlrubytutorial/

class DB_Mysql < Database

  # database connection
  @con = Mysql.new(ENV['DB_HOST'], ENV['DB_USER'], ENV['DB_PASSWORD'], ENV['DB_NAME'])

  ################################
  def self.con
    @con
  end

  ################################
  def initialize(**options)
    super(options)

    @options = default.merge(@options)
  end

  ################################
  def default
    {}
  end

  ################################
  def connection
    raise "no database connection" if DB_Mysql.con.nil?
  end

  ################################
  def migrate

  end

  ################################
  def dev_setup
    unless @options[:production]
      User.drop_table
      User.create_table
      User.create(first: 'Mark', second: 'Zuckerberg', acronym: 'mzuckerberg')
      User.create(first: 'Edward', second: 'Snowden', acronym: 'esnowden')
      User.create(first: 'Steve', second: 'Jobs', acronym: 'sjobs')
      User.create(first: 'Bill', second: 'Gates', acronym: 'bgates', admin: true)

      Sprint.drop_table
      Sprint.create_table
      Sprint.create(start: Time.new, end: Time.new)

      Project.drop_table
      Project.create_table
      Project.create(name: 'Web Design', acronym: 'WEB')
      Project.create(name: 'Database', acronym: 'DB')

      State.drop_table
      State.create_table
      State.create(name: 'Todo', acronym: 's-td')
      State.create(name: 'In Progress', acronym: 's-ip')
      State.create(name: 'Ready for Testing', acronym: 's-rt')
      State.create(name: 'Done', acronym: 's-do')

      Type.drop_table
      Type.create_table
      Type.create(name: 'bug')
      Type.create(name: 'task')

      ProjectMember.drop_table
      ProjectMember.create_table
      ProjectMember.create(project: 1, user: 1)

      Issue.drop_table
      Issue.create_table
      Issue.create(
          project_id: 1,
          name: 'Some Issue',
          parent: 1,
          project: 1,
          type: 1,
          state: 1,
          user_assigned: 'sjobs',
          user_created: 'sjobs'
      )
    end
  end

end