
require 'spec_helper'

def systemCommand(command)
    rs = %x{#{command}}
    if $? != 0
       puts rs
       exit 1
    end
end

describe IssueDAO do
    
    it_behaves_like "a DAO object"
    
    before :each do
        @database = double(:database)
        @issueDAO = IssueDAO.new(@database)
    end
    
    ######################
    
    describe "#new" do
        it "takes 1 parameters and returns a IssueDAO object" do
            expect(@issueDAO).to be_an_instance_of(IssueDAO)
        end
    end
    
    describe "#insert" do
        it "returns true on success" do
            allow(@database).to receive(:query).and_return({})
            issue = Issue.new(:id => 1)
            expect(@issueDAO.insert(issue)).to eql(true)  
        end
    end
    
    describe "#findAll" do
        it "returns all issues" do
            allow(@database).to receive(:query).and_return({:id => 1})
            @issueDAO.insert(Issue.new(:id => 1))
            expect(@issueDAO.findAll().length).to eql(1)
        end
    end
    
end