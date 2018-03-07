require 'issue_tracker/models/mysql/model'

class Issue < Model

  property :project_id, Integer, max: 6, unsigned: true, required: true
  property :name, Varchar, max: 25, required: true
  property :description, Text
  property :parent, Integer, max: 6, unsigned: true
  property :type, Integer, max: 3, unsigned: true, required: true
  property :project, Integer, max: 3, unsigned: true, required: true
  property :state, Integer, max: 3, unsigned: true, required: true
  property :sprint, Integer, max: 6, unsigned: true
  property :user_assigned, Integer, max: 6, unsigned: true, required: true
  property :user_created, Integer, max: 6, unsigned: true, required: true

end