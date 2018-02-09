
require 'mysql'
require 'issue_tracker/databases/database'
require 'issue_tracker/models/mysql/user'

# Mysql Ruby Tutorial:
# http://zetcode.com/db/mysqlrubytutorial/

class DB_Mysql < Database

  ################################
  def initialize(**options)
    super(options)

    @options = default.merge(@options)
  end

  ################################
  def default
    {
        max_size_id: 6 # max digits for IDs
    }
  end

  ################################
  def connection
    Mysql.new(ENV['DB_HOST'], ENV['DB_USER'], ENV['DB_PASSWORD']).query("DROP DATABASE IF EXISTS #{ENV['DB_NAME']}")
    Mysql.new(ENV['DB_HOST'], ENV['DB_USER'], ENV['DB_PASSWORD']).query("CREATE DATABASE #{ENV['DB_NAME']}")

    @con = Mysql.new(ENV['DB_HOST'], ENV['DB_USER'], ENV['DB_PASSWORD'], ENV['DB_NAME'])
    raise "no mysql database connection" if @con.nil?
  end

  ################################
  def migrate

  end

  ################################
  def dev_setup
    @con.query(<<eos)
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER(#{@options[:max_size_id]}) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        first VARCHAR(25) NOT NULL,
        second VARCHAR(25) NOT NULL,
        admin Boolean DEFAULT false
    )
eos
    @con.query(<<eos)
    CREATE TABLE IF NOT EXISTS issue (
        id INTEGER(#{@options[:max_size_id]}) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(25) NOT NULL,
        description TEXT,
        parent INTEGER(#{@options[:max_size_id]}) UNSIGNED,
        type INTEGER(#{@options[:max_size_id]}) UNSIGNED,
        project INTEGER(#{@options[:max_size_id]}) UNSIGNED,
        state INTEGER(#{@options[:max_size_id]}) UNSIGNED,
        sprint INTEGER(#{@options[:max_size_id]}) UNSIGNED,
        user_assigned INTEGER(#{@options[:max_size_id]}) UNSIGNED,
        user_created INTEGER(#{@options[:max_size_id]}) UNSIGNED
    )
eos
    @con.query(<<eos)
    CREATE TABLE IF NOT EXISTS project (
        id INTEGER(#{@options[:max_size_id]}) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(25) NOT NULL,
        acronym VARCHAR(5) NOT NULL
    )
eos
    @con.query(<<eos)
    CREATE TABLE IF NOT EXISTS sprint (
        id INTEGER(#{@options[:max_size_id]}) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        start DATE NOT NULL,
        end DATE NOT NULL
    )
eos
    @con.query(<<eos)
    CREATE TABLE IF NOT EXISTS state (
        id INTEGER(#{@options[:max_size_id]}) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(25) NOT NULL,
        acronym VARCHAR(5) NOT NULL
    )
eos
    @con.query(<<eos)
    CREATE TABLE IF NOT EXISTS type (
        id INTEGER(#{@options[:max_size_id]}) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(5) NOT NULL
    )
eos
    @con.query(<<eos)
    CREATE TABLE IF NOT EXISTS project_members (
        project INTEGER(#{@options[:max_size_id]}) UNSIGNED NOT NULL,
        user INTEGER(#{@options[:max_size_id]}) UNSIGNED NOT NULL,
        PRIMARY KEY(project, user)
    )
eos

    create_user('Mark', 'Zuckerberg')
    create_user('Edward', 'Snowden')
    create_user('Steve', 'Jobs')
    create_user('Bill', 'Gates')
  end

  ################################
  def create_user(first, second, admin=false)
    @con.query("INSERT INTO user (first, second, admin) VALUES ('#{first}', '#{second}', #{admin})")
  end

  ################################
  def users(**fields)
    where = ''
    where += "user.id='#{fields[:id]}' "          if fields[:id]
    where += "user.first='#{fields[:first]}' "    if fields[:first]
    where += "user.second='#{fields[:second]}' "  if fields[:second]
    where += "user.admin=#{fields[:admin]} "      if fields[:admin]
    rs = @con.query("SELECT * FROM user WHERE #{where}")

    users = []
    rs.num_rows.times { users << User.new(rs.fetch_row) }
    users
  end

  ################################
  def user(**fields)
    users(**fields)[0]
  end

end