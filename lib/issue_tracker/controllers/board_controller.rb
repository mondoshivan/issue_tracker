require 'issue_tracker/controllers/controller'

class BoardController < Controller

  get '/' do
    @page_title = 'Board'
    @controller = 'BoardController'
    slim :board
  end

end