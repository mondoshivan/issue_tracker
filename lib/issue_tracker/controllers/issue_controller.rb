require 'issue_tracker/controllers/controller'

class IssueController < Controller

  get '/' do
    @page_title = 'Issue'
    @controller = 'IssueController'
    slim :issue
  end

  post '/' do
    # puts params
    # puts request.inspect
    # @issue = Issue.create
    # puts @issue
    # puts Issue.all.inspect
    # # redirect to("?project=#{@issue.project}&id=#{@issue.project_id}")
    # redirect to('../backlog')
  end

  get '/all' do
    Issue.all().to_json
  end

end