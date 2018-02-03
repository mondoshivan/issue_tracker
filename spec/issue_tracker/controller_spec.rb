require 'issue_tracker/controllers/controller'

describe Controller do
  context '#initialize' do
    context 'given no arguments' do
      it 'initializes without exception' do
        Controller.new
      end
    end
  end
end
