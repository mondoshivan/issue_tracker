require 'dm-core'
require 'dm-migrations'

class State

  include DataMapper::Resource

  property :id, Serial
  property :name, String, required: true
  property :acronym, String, required: true

  has n, :issues
end
