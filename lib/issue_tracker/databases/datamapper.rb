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
  def init_users
    unless @options[:production]
      if User.all.size == 0
        User.create(first: 'Mark', second: 'Zuckerberg')
        User.create(first: 'Edward', second: 'Snowden')
        User.create(first: 'Steve', second: 'Jobs')
        User.create(first: 'Bill', second: 'Gates')
      end
    end
  end

  ################################
  def init_projects
    unless @options[:production]
      if Project.all.size == 0
        Project.create(acronym: 'WEB', name: 'Web Development')
        Project.create(acronym: 'DB', name: 'Databases')
      end
    end
  end

  ################################
  def init_types
    if Type.all.size == 0
      Type.create(name: 'Bug')
      Type.create(name: 'Task')
    end
  end

  public

  ################################
  def users(fields={})
    User.all(fields)
  end

end
