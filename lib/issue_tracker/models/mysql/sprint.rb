

class Sprint < Model

  property :id, Integer, unsigned: true, primary_key: true, auto_increment: true
  property :name, Varchar, max: 25, required: true
  property :start, Date, required: true
  property :end, Date, required: true

end