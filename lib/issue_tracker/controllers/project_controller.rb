require 'issue_tracker/controllers/controller'

class ProjectController < Controller

  get '/all' do
    @projects = Project.all()
    @projects.to_json
  end

end