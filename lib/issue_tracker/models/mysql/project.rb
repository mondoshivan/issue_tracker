

class Project < Model

  property :name, Varchar, max: 25, required: true
  property :acronym, Varchar, max: 5, required: true
  property :revision, Integer, unsigned: true, default: 1

end

