require 'issue_tracker/models/mysql/model'

class User < Model

  property :first, Varchar, max: 25, required: true
  property :second, Varchar, max: 25, required: true
  property :acronym, Varchar, max: 25, required: true, unique: true
  property :password, Varchar, required: true, checksum: 'md5'
  property :admin, Boolean, required: true, default: false

end