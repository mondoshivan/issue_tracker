
class Issue
    
    attr_reader :id
    attr_reader :name
    attr_reader :type
    attr_reader :description
    attr_reader :created
    attr_reader :modified
    attr_reader :parent_id
    
    ###########################
    def initialize(hash)
        hash.each { |k,v| instance_variable_set("@#{k}", v) unless v.nil? }
    end
    
end
