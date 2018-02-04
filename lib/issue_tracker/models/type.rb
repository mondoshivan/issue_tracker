require 'dm-core'
require 'dm-migrations'

class Type

  include DataMapper::Resource

  property :id, Serial
  property :name, String, required: true

  has n, :issues

end
