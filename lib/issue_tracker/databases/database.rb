
require 'issue_tracker/helpers/abstract'

class Database

  extend Abstract
  abstract_methods :connection, :migrate, :init_users, :init_projects, :init_types

  ################################
  def initialize(options={})
    @options = default.merge(options)

    connection
    migrate
    init_users
    init_projects
    init_types
  end

  private

  ################################
  def default
    {
        db_dir: File.expand_path('../../../../', __FILE__),
        production: ENV['RACK_ENV'] == 'production'
    }
  end

end
