require 'issue_tracker/databases/database'

describe Database do
  context 'abstract' do
    it 'raises NotImplementedError' do
      expect{ Database.new.connection }.to raise_error(NotImplementedError)
      expect{ Database.new.migrate }.to raise_error(NotImplementedError)
      expect{ Database.new.init_users }.to raise_error(NotImplementedError)
      expect{ Database.new.init_projects }.to raise_error(NotImplementedError)
      expect{ Database.new.init_types }.to raise_error(NotImplementedError)
    end

    it 'can be overridden' do
      subclass = Class.new(Database) do
        def connection
          :overridden
        end
        def migrate
          :overridden
        end
        def init_users
          :overridden
        end
        def init_projects
          :overridden
        end
        def init_types
          :overridden
        end
      end

      expect(subclass.new.connection).to      eq :overridden
      expect(subclass.new.migrate).to         eq :overridden
      expect(subclass.new.init_users).to      eq :overridden
      expect(subclass.new.init_projects).to   eq :overridden
      expect(subclass.new.init_types).to      eq :overridden
    end
  end
end
