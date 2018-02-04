require 'dm-core'
require 'dm-migrations'

class User

  include DataMapper::Resource

  property :id, Serial
  property :first, String
  property :second, String
  property :admin, Boolean, :default  => false
end



