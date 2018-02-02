require 'spec_helper'

def systemCommand(command)
    rs = %x{#{command}}
    if $? != 0
       puts rs
       exit 1
    end
end

describe Database do
    
    before :each do
        systemCommand("mysql -u root < database_create.sql")
        @database = Database.new("localhost", "issuetracker", "issuetracker", "issuetracker")
    end
    
    after :each do 
        systemCommand("mysql -u root < database_remove.sql")
    end
    
    ######################
    
    describe "#new" do
        it "takes 4 parameters and returns a Database object" do
            expect(@database).to be_an_instance_of(Database)
        end
    end
    
end