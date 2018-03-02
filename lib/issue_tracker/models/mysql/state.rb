

class State < Model

  property :name, Varchar, max: 25, required: true
  property :acronym, Varchar, max: 5, required: true

end

