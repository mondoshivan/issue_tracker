# Configuration files used by Rack apps

############################
# Class Path - Adjustments #
############################

lib = File.expand_path('../lib', __FILE__)
$:.unshift(lib) unless $:.include?(lib)


############
# Includes #
############

require 'sinatra/base'
require 'issue_tracker'

map('/') { run IssueTracker }
map('/backlog') { run BacklogController }
map('/board') { run BoardController }
map('/issue') { run IssueController }