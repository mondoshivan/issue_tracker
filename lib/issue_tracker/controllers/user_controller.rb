require 'issue_tracker/controllers/controller'

class UserController < Controller

  get '/all' do
    @users = User.all(:fields=>[:id, :first, :second])
    @users.to_json
  end

end