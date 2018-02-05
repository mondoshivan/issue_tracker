require 'dm-core'
require 'dm-migrations'

class Issue

  include DataMapper::Resource

  property :id, Serial
  property :parent, Integer, required: true
  property :name, String, required: true
  property :description, String
  property :user_created, Integer, required: true
  property :user_assigned, Integer, required: true

  belongs_to :type
  belongs_to :project
  belongs_to :state
  belongs_to :sprint

end