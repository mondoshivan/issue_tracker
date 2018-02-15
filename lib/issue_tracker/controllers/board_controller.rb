require 'issue_tracker/controllers/controller'

class BoardController < Controller

  before do
    logged_in!
  end

  get '/' do
    @page_title = 'Board'
    @controller = 'BoardController'
    slim :board
  end

end