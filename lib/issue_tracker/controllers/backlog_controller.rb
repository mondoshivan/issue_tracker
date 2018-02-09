require 'issue_tracker/controllers/controller'

class BacklogController < Controller

  get '/' do



    @page_title = 'Backlog'
    @controller = 'BacklogController'
    slim :backlog
  end

end