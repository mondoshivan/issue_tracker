require 'issue_tracker/controllers/controller'

class IssueController < Controller

  ################################
  def new_project_id(project)
    id = Issue.max(:project_id, project: project).to_i
    id ? id+1 : 1 # if id is nil, the first issue gets project_id -> 1
  end

  ################################
  def redirect_url(params)
    "../#{params['redirect'].gsub(/^\//, '')}"
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
        user_assigned: session[:user_id],
        user_created: session[:user_id]
    )
    redirect to(redirect_url) if params['redirect']
  end

  post '/update' do
    content_type :json

    payload = params
    payload = JSON.parse(request.body.read) unless params[:path]

    Issue.update(
        id:             payload['id'],
        parent:         payload['parent'],
        name:           payload['name'],
        description:    payload['description'],
        project:        payload['project'],
        project_id:     payload['project_id'],
        type:           payload['type'],
        user_created:   payload['user_created'],
        user_assigned:  payload['user_assigned'],
        state:          payload['state'],
        sprint:         payload['sprint']
    ).to_json
  end

  get '/all' do
    content_type :json
    Issue.all.to_json
  end

end