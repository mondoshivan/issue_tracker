require 'issue_tracker/controllers/controller'

class TypeController < Controller

  get '/all' do
    @types = Type.all()
    @types.to_json
  end

end