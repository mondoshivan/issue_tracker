require 'issue_tracker/models/mysql/data_types/serial'
require 'issue_tracker/models/mysql/data_types/boolean'

module Property

  def properties
    @properties ||= []
  end

  def property(*args)
    properties << {
        name: args[0],
        type: args[1],
        options: args[2]
    }
  end
end