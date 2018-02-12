require 'issue_tracker/models/mysql/data_types/integer'
require 'issue_tracker/models/mysql/data_types/boolean'
require 'issue_tracker/models/mysql/data_types/varchar'
require 'issue_tracker/models/mysql/data_types/text'

module Property

  def properties
    @properties ||= []
  end

  def property(*args)
    properties << {
        name: args[0],
        type: args[1],
        options: args[2] ||= {}
    }
  end
end