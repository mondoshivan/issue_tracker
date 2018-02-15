require 'issue_tracker/controllers/controller'

class ProjectController < Controller

  before do
    logged_in!
  end

  get '/all' do
    Project.all.to_json
  end

end