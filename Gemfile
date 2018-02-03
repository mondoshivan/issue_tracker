source 'https://rubygems.org'

gem 'sinatra'
gem 'sinatra-flash'

group :production, :development do
    gem 'json'
    gem 'slim'
    gem 'data_mapper'
    gem 'dm-sqlite-adapter'
    gem 'dm-serializer'
    gem 'sass'
    gem 'chartkick'
    gem 'nokogiri'
    gem 'coffee-script'
    gem 'therubyracer'
    gem 'bcrypt-ruby', :require => 'bcrypt'
end

group :development do
    gem 'sinatra-contrib' # sinatra-reloader is part of sinatra-contrib
end

group :test do
    gem 'rspec'
end