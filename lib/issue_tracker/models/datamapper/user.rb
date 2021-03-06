require 'dm-core'
require 'dm-migrations'

class User

  include DataMapper::Resource

  property :id, Serial
  property :first, String, required: true
  property :second, String, required: true
  property :admin, Boolean, required: true, default: false

  belongs_to :user_assigned, :model => 'Issue'
  belongs_to :user_created, :model => 'Issue'
end

