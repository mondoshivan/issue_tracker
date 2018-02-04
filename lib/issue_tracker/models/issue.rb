require 'dm-core'
require 'dm-migrations'

class Issue

  include DataMapper::Resource

  property :id, Serial
  property :project, String, required: true
  property :project_id, Integer, required: true
  property :parent, Integer, required: true
  property :name, String, required: true
  property :description, String
  property :user_created, Integer, required: true
  property :user_assigned, Integer, required: true
  property :state, Integer, required: true
  property :position, Integer, required: true

  belongs_to :type

end