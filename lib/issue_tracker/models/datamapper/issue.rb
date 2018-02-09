require 'dm-core'
require 'dm-migrations'



class Issue

  include DataMapper::Resource

  property :id, Serial
  # property :parent, Integer, required: true
  property :name, String, required: true
  property :description, String

  # has 0..n,    :user_assigned,  'User'
  # has 0..n,    :user_created,  'User'

  belongs_to :type
  belongs_to :project
  belongs_to :state
  belongs_to :sprint

end



# class IssueDependency
#   include DataMapper::Resource
#
#   belongs_to :source, 'Issue', :key => true
#   belongs_to :target, 'Issue', :key => true
# end