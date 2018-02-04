require 'issue_tracker/controllers/controller'

class IssueController < Controller

  get '/' do
    @page_title = 'Issue'
    @controller = 'IssueController'
    slim :issue
  end

end