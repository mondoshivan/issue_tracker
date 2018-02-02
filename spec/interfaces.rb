shared_examples "a DAO object" do
    let(:dao) { described_class.new({}) }
    
    it { dao.should respond_to(:insert).with(1).argument}  
    it { dao.should respond_to(:update).with(1).argument }
    it { dao.should respond_to(:findAll).with(0).argument }
    it { dao.should respond_to(:delete).with(1).argument }
    
    it { expect { dao.insert(nil) }.to raise_error(ArgumentError) }
    it { expect { dao.update(nil) }.to raise_error(ArgumentError) }
    it { expect { dao.delete(nil) }.to raise_error(ArgumentError) }
end