require 'dm-core'
require 'dm-migrations'
require 'dm-serializer'

require 'issue_tracker/databases/database'

# Models
require 'issue_tracker/models/datamapper/user'
require 'issue_tracker/models/datamapper/issue'
require 'issue_tracker/models/datamapper/project'
require 'issue_tracker/models/datamapper/state'
require 'issue_tracker/models/datamapper/type'
require 'issue_tracker/models/datamapper/sprint'


class DB_DataMapper < Database

  ################################
  def initialize(options={})
    super(options)

    DataMapper::Model.raise_on_save_failure = true
  end

  ################################
  def connection
    DataMapper.finalize
    db_file_name = @options[:production] ? 'production' : 'development'
    DataMapper.setup(:default, "sqlite3://#{@options[:db_dir]}/#{db_file_name}.db")
  end

  ################################
  def migrate
    if @options[:production]
      DataMapper.auto_upgrade!
    else
      DataMapper.auto_migrate!
    end
  end

  ################################
  def dev_setup
    if Type.all.size == 0
      create_type('Bug')
      create_type('Task')
    end

    unless @options[:production]

      if User.all.size == 0
        create_user('Mark', 'Zuckerberg')
        create_user('Edward', 'Snowden')
        create_user('Steve', 'Jobs')
        create_user('Bill', 'Gates')

        users = User.all
        puts users.inspect
      end

      if Project.all.size == 0
        create_project('WEB', 'Web Development')
        create_project('DB', 'Databases')
      end

      if Issue.all.size == 0
        issue = create_issue(
            name: 'Some Name',
            type: type(name: 'Bug'),
            description: 'Some description',
            project: project(acronym: 'WEB'),
            user_assigned: user(first: 'Bill', second: 'Gates'),
            user_created: user(first: 'Mark', second: 'Zuckerberg')
        )

        user = user(first: 'Bill', second: 'Gates')
        puts issue.inspect
      end
    end
  end

  public

  ################################
  def users(fields={})
    User.all(fields)
  end

  ################################
  def user(fields={})
    User.first(fields)
  end

  ################################
  def types(fields={})
    Type.all(fields)
  end

  ################################
  def type(fields={})
    Type.first(fields)
  end

  ################################
  def projects(**fields)
    Project.all(fields)
  end

  ################################
  def project(**fields)
    Project.first(fields)
  end

  ################################
  def create_user(first, second, admin=false)
    User.create(first: first, second: second, admin: admin)
  end

  ################################
  def create_project(acronym, name)
    Project.create(acronym: acronym, name: name)
  end

  ################################
  def create_type(name)
    Type.create(name: name)
  end

  ################################
  def create_issue(**options)
    issue = Issue.create(
        name: options[:name],
        description: options[:description],
        type: options[:type],
        project: options[:project],
        state: options[:state],
        sprint: options[:sprint]
    )
    issue.user_assigned = options[:user_assigned]
    issue.user_created = options[:user_created]
    issue
  end

end
