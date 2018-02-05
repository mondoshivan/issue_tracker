require 'dm-core'
require 'dm-migrations'

class Sprint

  include DataMapper::Resource

  property :id, Serial
  property :start, String, required: true
  property :end, String, required: true

  has n, :issues
end
