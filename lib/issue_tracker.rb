#!/usr/bin/env ruby


############
# Includes #
############

require 'json'
require 'slim'
require 'sass'
require 'coffee-script'
require 'thin'

# Controllers
require 'issue_tracker/controllers/controller'
require 'issue_tracker/controllers/backlog_controller'
require 'issue_tracker/controllers/board_controller'
require 'issue_tracker/controllers/issue_controller'
require 'issue_tracker/controllers/project_controller'
require 'issue_tracker/controllers/user_controller'
require 'issue_tracker/controllers/state_controller'
require 'issue_tracker/controllers/type_controller'
require 'issue_tracker/controllers/sprint_controller'
require 'issue_tracker/controllers/asset_handler'


class IssueTracker < Controller

  use AssetHandler


  #################
  # Configuration #
  #################

  configure do
    set :config_dir, settings.root + '/config'
    set :server, "thin"
  end

  configure :production do
    set :root, File.join(File.dirname(__FILE__), '..')
  end
  configure :development do
    set :root, File.join(File.dirname(__FILE__), '..')
  end


  ##################
  # Route Handlers #
  ##################

  get '/' do
    @page_title = 'Index'
    @controller = 'Index'
    slim :index
  end

  get '/login' do
    slim :login
  end

  not_found do
    slim :not_found, :layout => :no_layout
  end

  # directly executed (then we need to call 'run') or by another file?
  run! if __FILE__ == $0
end
