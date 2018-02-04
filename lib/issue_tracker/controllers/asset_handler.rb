
class AssetHandler < Controller
  configure do
    set :views, settings.root + '/assets'
    set :jsdir, 'js'
    set :cssdir, 'css'
    # enable :coffeescript
    set :cssengine, 'scss'
  end

=begin
  get '/js/*.js' do
    puts "coffee? #{settings.coffeescript?}"
    pass unless settings.coffeescript?
    last_modified File.mtime(settings.root+'/assets/'+settings.jsdir)
    cache_control :public, :must_revalidate
    coffee (settings.jsdir + '/' + params[:splat].first).to_sym
  end
=end

  get '/*.css' do
    last_modified File.mtime(File.join(settings.root, 'assets', settings.cssdir))
    cache_control :public, :must_revalidate
    puts "send: #{(params[:splat].first).to_sym.inspect}"
    send(settings.cssengine, (params[:splat].first).to_sym)
  end
end