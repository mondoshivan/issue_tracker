require 'issue_tracker/controllers/controller'

class UserController < Controller

  before do
    logged_in!
  end

  get '/all' do
    content_type :json
    User.all.to_json
  end

end