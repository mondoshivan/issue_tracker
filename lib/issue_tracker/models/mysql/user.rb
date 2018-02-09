

class User

  attr_reader :id
  attr_reader :first
  attr_reader :second
  attr_reader :admin

  ###############################
  def initialize(values=[])
    @id = values[0]
    @first = values[1]
    @second = values[2]
    @admin = values[3] == "1"
  end

end