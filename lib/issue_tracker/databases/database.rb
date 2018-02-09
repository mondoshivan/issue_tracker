
require 'issue_tracker/helpers/abstract'

class Database

  extend Abstract
  abstract_methods :connection, :migrate, :dev_setup

  ################################
  def initialize(**options)
    @options = default.merge(options)

    connection
    migrate
    dev_setup
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
