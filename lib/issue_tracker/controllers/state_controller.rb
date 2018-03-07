require 'issue_tracker/controllers/controller'

class StateController < Controller

  before do
    logged_in!
  end

  get '/all' do
    content_type :json
    State.all.to_json
  end

end