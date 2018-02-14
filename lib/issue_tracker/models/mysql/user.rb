require 'issue_tracker/models/mysql/model'

class User < Model

  property :id, Integer, max: 3, unsigned: true, primary_key: true, auto_increment: true
  property :first, Varchar, max: 25, required: true
  property :second, Varchar, max: 25, required: true
  property :acronym, Varchar, max: 25, required: true, unique: true
  property :password, Varchar, max: 32, required: true
  property :admin, Boolean, required: true, default: false

end