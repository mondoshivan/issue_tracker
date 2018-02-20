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
    params[:user_assigned] = session[:user].acronym
    params[:user_created]  = session[:user].acronym
    Issue.create(params)
  end

  get '/all' do
    Issue.all.to_json
  end

end