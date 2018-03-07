source 'https://rubygems.org'

gem 'sinatra'
gem 'sinatra-flash'
gem 'rack-protection'
gem 'thin'

group :production, :development do
    gem 'json'
    gem 'slim'
    gem 'data_mapper'
    gem 'dm-sqlite-adapter'
    gem 'dm-serializer'
    gem 'sass'
    gem 'therubyracer'
    gem 'coffee-script'
    gem 'mysql'
end

group :development do
    gem 'sinatra-contrib' # sinatra-reloader is part of sinatra-contrib
end

group :test do
    gem 'rspec'
end