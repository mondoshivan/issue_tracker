require 'spec_helper'


describe DAOFactory do 
    
    before :each do
        @database = {}
        @daoFactory = DAOFactory.new(@database)
    end
    
    describe "#new" do
        it "takes 1 parameters and returns an DAOFactory object" do
            expect(@daoFactory).to be_an_instance_of(DAOFactory)
        end
    end
    
    describe "#getDAO" do
        it "returns an IssueDAO object" do
            expect(@daoFactory.getDAO(DAOFactory::ISSUE_DAO)).to be_an_instance_of(IssueDAO)
        end
    end
    
end