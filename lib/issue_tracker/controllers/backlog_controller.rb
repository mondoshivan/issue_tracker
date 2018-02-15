require 'issue_tracker/controllers/controller'

class BacklogController < Controller

  before do
    logged_in!
  end

  get '/' do
    @page_title = 'Backlog'
    @controller = 'BacklogController'
    slim :backlog
  end

end