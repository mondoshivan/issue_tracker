require 'issue_tracker/controllers/controller'

class ProjectController < Controller

  get '/all' do
    @projects = Project.all(:fields=>[:id, :name, :acronym])
    @projects.to_json
  end

end