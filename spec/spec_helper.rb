
lib = File.expand_path('../../spec', __FILE__)
$:.unshift(lib) unless $:.include?(lib)

require 'issue_tracker/controllers/controller_spec.rb'

# Databases
require 'issue_tracker/databases/database_spec.rb'
require 'issue_tracker/databases/datamapper_spec.rb'

