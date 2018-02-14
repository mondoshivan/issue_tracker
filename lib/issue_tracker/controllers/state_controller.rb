require 'issue_tracker/controllers/controller'

class StateController < Controller

  get '/all' do
    @states = State.all()
    @states.to_json
  end

end