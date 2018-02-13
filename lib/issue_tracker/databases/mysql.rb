
require 'mysql'
require 'issue_tracker/databases/database'
require 'issue_tracker/models/mysql/user'
require 'issue_tracker/models/mysql/issue'
require 'issue_tracker/models/mysql/sprint'

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


#     @con.query(<<eos)
#     CREATE TABLE IF NOT EXISTS project (
#         id INTEGER(#{@options[:max_size_id]}) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
#         name VARCHAR(25) NOT NULL,
#         acronym VARCHAR(5) NOT NULL
#     )
# eos

#     @con.query(<<eos)
#     CREATE TABLE IF NOT EXISTS state (
#         id INTEGER(#{@options[:max_size_id]}) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
#         name VARCHAR(25) NOT NULL,
#         acronym VARCHAR(5) NOT NULL
#     )
# eos
#     @con.query(<<eos)
#     CREATE TABLE IF NOT EXISTS type (
#         id INTEGER(#{@options[:max_size_id]}) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
#         name VARCHAR(5) NOT NULL
#     )
# eos
#     @con.query(<<eos)
#     CREATE TABLE IF NOT EXISTS project_members (
#         project INTEGER(#{@options[:max_size_id]}) UNSIGNED NOT NULL,
#         user INTEGER(#{@options[:max_size_id]}) UNSIGNED NOT NULL,
#         PRIMARY KEY(project, user)
#     )
# eos

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