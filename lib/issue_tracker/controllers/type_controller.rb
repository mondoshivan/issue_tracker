require 'issue_tracker/controllers/controller'

class TypeController < Controller

  before do
    logged_in!
  end

  get '/all' do
    Type.all.to_json
  end

end