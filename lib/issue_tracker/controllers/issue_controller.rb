require 'issue_tracker/controllers/controller'

class IssueController < Controller

  before do
    logged_in!
  end

  get '/' do
    @page_title = 'Issue'
    @controller = 'IssueController'
    slim :issue
  end

  post '/' do
    puts params
    puts request.inspect
    params[:user_assigned] = session[:user_id]
    params[:user_created]  = session[:user_id]
    @issue = Issue.create(params)
    puts @issue
    # redirect to("?project=#{@issue.project}&id=#{@issue.project_id}")
    redirect to('../backlog')
  end

  get '/all' do
    Issue.all.to_json
  end

end