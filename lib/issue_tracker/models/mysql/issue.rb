require 'issue_tracker/models/mysql/model'

class Issue < Model

  property :project_id, Integer, max: 6, unsigned: true, required: true, key: true
  property :name, Varchar, max: 25, required: true
  property :description, Text
  property :parent, Integer, max: 6, unsigned: true
  property :type, Integer, max: 3, unsigned: true, required: true
  property :project, Integer, max: 3, unsigned: true, required: true, key: true
  property :state, Integer, max: 3, unsigned: true, required: true
  property :sprint, Integer, max: 6, unsigned: true
  property :user_assigned, Integer, max: 6, unsigned: true, required: true
  property :user_created, Integer, max: 6, unsigned: true, required: true

  ################################
  def self.create(fields)
    fields[:project_id] = Issue.all(project: fields[:project]).count
    fields[:user_assigned] = User.first(acronym: fields[:user_assigned]).id
    fields[:user_created] = User.first(acronym: fields[:user_created]).id
    super(fields)
  end

end