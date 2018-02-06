require 'issue_tracker/databases/datamapper'

describe DB_DataMapper do
  context '#initialize' do
    context 'given no arguments' do
      it 'initializes without exception' do
        DB_DataMapper.new
      end
    end
    context 'given options' do
      it 'initializes without exception' do
        DB_DataMapper.new({})
      end
    end
  end
end

