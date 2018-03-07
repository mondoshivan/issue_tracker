require 'issue_tracker/controllers/controller'

class TypeController < Controller

  before do
    logged_in!
  end

  get '/all' do
    content_type :json
    Type.all.to_json
  end

end