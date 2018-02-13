

class State < Model

  property :id, Integer, max: 3, unsigned: true, primary_key: true, auto_increment: true
  property :name, Varchar, max: 25, required: true
  property :acronym, Varchar, max: 5, required: true

end

