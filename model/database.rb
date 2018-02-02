require 'mysql2'

class Database
    
    #############################
    def initialize(host, database, user, password)
        @host = host
        @database = database
        @user = user
        @password = password
        
        @client = Mysql2::Client.new(
          :host => @host, 
          :username => @user, 
          :password => @password,
          :database => @database
        )
    end
    
    #############################
    def query(string)
        return @client.query(string)
    end
    
end
