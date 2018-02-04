require 'dm-core'
require 'dm-migrations'

class Project

  include DataMapper::Resource

  property :id, Serial
  property :name, String, required: true
  property :acronym, String, required: true

end
