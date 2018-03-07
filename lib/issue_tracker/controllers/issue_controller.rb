require 'issue_tracker/controllers/controller'

class IssueController < Controller

  ################################
  def new_project_id(project)
    id = Issue.max(:project_id, project: project).to_i
    id ? id+1 : 1 # if id is nil, the first issue gets the project_id -> 1
  end

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
        project_id: new_project_id(params['project']),
        type: params['type'],
        state: params['state'],
        user_assigned: session[:user].id,
        user_created: session[:user].id
    )
    redirect to("../#{params['redirect'].gsub(/^\//, '')}")
  end

  get '/all' do
    Issue.all.to_json
  end

end