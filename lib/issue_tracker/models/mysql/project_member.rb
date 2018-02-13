
class ProjectMember < Model

  property :project, Integer, max: 3, unsigned: true, required: true, key: true
  property :user, Integer, max: 3, unsigned: true, required: true, key: true

end
