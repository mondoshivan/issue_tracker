#!/usr/bin/env ruby


############
# Includes #
############

require 'json'
require 'slim'
require 'dm-core'
require 'dm-migrations'
require 'dm-serializer'
require 'sass'
require 'coffee-script'

# Controllers
require 'issue_tracker/controllers/controller'
require 'issue_tracker/controllers/backlog_controller'
require 'issue_tracker/controllers/board_controller'
require 'issue_tracker/controllers/issue_controller'
require 'issue_tracker/controllers/project_controller'
require 'issue_tracker/controllers/user_controller'
require 'issue_tracker/controllers/asset_handler'

# Models
require 'issue_tracker/models/user'
require 'issue_tracker/models/issue'
require 'issue_tracker/models/project'
require 'issue_tracker/models/state'
require 'issue_tracker/models/type'


class IssueTracker < Controller

  use AssetHandler


  #################
  # Configuration #
  #################

  configure do
    set :config_dir, settings.root + '/config'
  end

  configure :production do
    set :root, File.join(File.dirname(__FILE__), '..')

    DataMapper.finalize
    DataMapper.setup(:default, "sqlite3://#{settings.root}/production.db")
    DataMapper.auto_upgrade!

    # User.create(name: 'admin', password: 'admin', admin: true) if User.all.size == 0
  end
  configure :development do
    set :root, File.join(File.dirname(__FILE__), '..')

    DataMapper.finalize
    DataMapper.setup(:default, "sqlite3://#{settings.root}/development.db")
    DataMapper.auto_migrate!

    if User.all.size == 0
      User.create(first: 'Mark', second: 'Zuckerberg')
      User.create(first: 'Edward', second: 'Snowden')
      User.create(first: 'Steve', second: 'Jobs')
      User.create(first: 'Bill', second: 'Gates')
    end
    if Project.all.size == 0
      Project.create(acronym: 'WEB', name: 'Web Development')
      Project.create(acronym: 'DB', name: 'Datenbanken')
    end
    if Type.all.size == 0
      Type.create(name: 'Bug')
      Type.create(name: 'Task')
    end
  end
  configure :test do

  end


  ##################
  # Route Handlers #
  ##################

  get '/' do
    slim :index
  end

  not_found do
    slim :not_found, :layout => :no_layout
  end

  # directly executed (then we need to call 'run') or by another file?
  run! if __FILE__ == $0
end
