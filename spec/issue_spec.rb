require 'spec_helper'


describe Issue do 
    
    before :each do
        @issue = Issue.new(
            :id => 1, 
            :name => "issue name", 
            :type => "issue type", 
            :description => "issue description",
            :created => "issue created",
            :parent_id => 0,
            :modified => "issue modified"
        )
    end
    
    describe "#new" do
        it "takes 1 parameters and returns an Issue object" do
            expect(@issue).to be_an_instance_of(Issue)
        end
    end
    
    describe "#id" do
        it "returns the item id" do
            expect(@issue.id).to eql(1) 
        end 
    end
    
    describe "#name" do
        it "returns the issue name" do
            expect(@issue.name).to eql("issue name") 
        end 
    end
    
    describe "#type" do
        it "returns the type" do
            expect(@issue.type).to eql("issue type") 
        end 
    end
    
    describe "#modified" do
        it "returns the modified date" do
            expect(@issue.modified).to eql("issue modified") 
        end 
    end
    
    describe "#created" do
        it "returns the created date" do
            expect(@issue.created).to eql("issue created") 
        end 
    end
    
    describe "#parent_id" do
        it "returns the parent id" do
            expect(@issue.parent_id).to eql(0) 
        end 
    end
    
    describe "#description" do
        it "returns the issue description" do
            expect(@issue.description).to eql("issue description") 
        end 
    end
    
end