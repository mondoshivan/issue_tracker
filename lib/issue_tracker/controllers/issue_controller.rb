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
    Issue.create(
        name: params['name'],
        description: params['description'],
        project: params['project'],
        type: params['type'],
        state: params['state'],
        user_assigned: session[:user].acronym,
        user_created: session[:user].acronym
    )
    redirect to("../#{params['redirect'].gsub(/^\//, '')}")
  end

  get '/all' do
    Issue.all.to_json
  end

end