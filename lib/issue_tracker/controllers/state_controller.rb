require 'issue_tracker/controllers/controller'

class StateController < Controller

  before do
    logged_in!
  end

  get '/all' do
    State.all.to_json
  end

end