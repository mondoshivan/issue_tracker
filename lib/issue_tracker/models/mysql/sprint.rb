

class Sprint < Model

  property :name, Varchar, max: 25, required: true
  property :start, Date, required: true
  property :end, Date, required: true

end