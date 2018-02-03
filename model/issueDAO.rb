
class IssueDAO
    
    #############################
    def initialize(database)
       @database = database 
    end
    
    #############################
    def insert(issue)
        raise ArgumentError if issue.is_a?(Issue) == false
        @database.query("INSERT INTO issues (name, description, created, modified) VALUES ('#{issue.name}', '#{issue.description}', NOW(), NOW());")
        return true
    end
    
    #############################
    def findAll()
        results = []
        @database.query('SELECT * FROM issues').each do |row|
           results.push(Issue.new(row)) 
        end
        return results
    end
    
    #############################
    def update(issue)
        raise ArgumentError if issue.is_a?(Issue) == false
    end
    
    #############################
    def delete(issue)
        raise ArgumentError if issue.is_a?(Issue) == false
    end
end