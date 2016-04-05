#require 'lol'
class ChampionsController < ApplicationController
  def show
    #client = Lol::Client.new ENV["RIOT_DEV_API_KEY"], {region: "euw"}
    @version = Gameversion.first.version
    #client = start_lol_client('euw')
    @champion = Champion.find_by api_id: params[:id]
    #@champion = client.static.champion.get(id = params[:id], champData: 'all')
    # binding.pry
    @items = Item.all
  end
end
