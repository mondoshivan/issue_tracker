require 'issue_tracker/controllers/controller'

class UserController < Controller

  get '/all' do
    @users = User.all()
    @users.to_json
  end

end