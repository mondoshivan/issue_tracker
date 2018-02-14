require 'issue_tracker/controllers/controller'

class SprintController < Controller

  get '/all' do
    @sprints = Sprint.all()
    @sprints.to_json
  end

end