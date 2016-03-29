require 'lol'
class SiteController < ApplicationController
  

  def home
    
  end

  def show_champions_greed 
    #client = Lol::Client.new ENV["RIOT_DEV_API_KEY"], {region: "euw"}
    # @champions =  client.static.champion.get(champData: 'image')
    # @version = client.static.versions.get[0]
    @champions = Champion.all
    @version = Gameversion.first.version
    render 'champions_grid' 
  end

end
