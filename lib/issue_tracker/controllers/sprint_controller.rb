require 'issue_tracker/controllers/controller'

class SprintController < Controller

  before do
    logged_in!
  end

  get '/all' do
    content_type :json
    Sprint.all.to_json
  end

end