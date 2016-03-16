require 'lol'
class ChampionsController < ApplicationController
   def show
    client = Lol::Client.new ENV["RIOT_DEV_API_KEY"], {region: "euw"}
    #client = start_lol_client('euw')
    @champion = client.static.champion.get(id = params[:id], champData: 'all')
    # binding.pry
    # puts "hi"
   end
end
