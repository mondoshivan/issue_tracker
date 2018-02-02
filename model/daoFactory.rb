require_relative './issueDAO'

class DAOFactory
    
    # DAO Types
    ISSUE_DAO = 1
    
    #########################
    def initialize(database)
        @database = database
    end
    
    #########################
    def getDAO(type)
        return IssueDAO.new(@database) if type == ISSUE_DAO
    end
    
end