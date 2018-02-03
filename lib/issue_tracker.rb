#!/usr/bin/env ruby


############
# Includes #
############

require 'slim'
require 'dm-core'
require 'dm-migrations'
require 'dm-serializer'
require 'sass'
require 'coffee-script'

# Controllers
require 'issue_tracker/controllers/controller'

# Models
require 'issue_tracker/models/user'

class IssueTracker < Controller


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

    User.create(name: 'admin', password: 'admin', admin: true) if User.all.size == 0
  end
  configure :test do

  end


  ##################
  # Route Handlers #
  ##################

  get '/' do
    @users = User.all
    @users.size
    slim :index
  end

  not_found do
    slim :not_found, :layout => :no_layout
  end

  # directly executed (then we need to call 'run') or by another file?
  run! if __FILE__ == $0

end
