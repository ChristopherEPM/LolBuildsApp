require 'lol'
class SummonersController < ApplicationController

  def show
    client = Lol::Client.new ENV["RIOT_DEV_API_KEY"], {region: "euw"}
    summoner = client.summoner.by_name("Biman")
    summoner_id = summoner[0].id
    summoner_sumary_stats = client.stats.ranked(summoner_id)
    summoner_champs_stats = summoner_sumary_stats.champions
    won_games = total_won(summoner_champs_stats)
    lost_games = total_lost(summoner_champs_stats)
    @played_games = total_played(summoner_champs_stats)
    @kills = total_champions_kills(summoner_champs_stats)
    @assists = total_assists(summoner_champs_stats)
    @deaths = total_deaths(summoner_champs_stats)
    champions_played =  summoner_champs_stats.length
    @winrate = ((won_games.to_f/@played_games)*100).round(2)
    @kills_average = (@kills.to_f/@played_games).round(1)
    @death_average = (@deaths.to_f/@played_games).round(1)
    @assist_average = (@assists.to_f/@played_games).round(1)
  end




  private
    def total_played(stats) 
      played = 0
      stats.each{|champion| played += champion.stats.total_sessions_played }
      played
    end

    def total_won(stats) 
      won = 0
      stats.each{|champion| won += champion.stats.total_sessions_won }
      won
    end

    def total_lost(stats) 
      lost = 0
      stats.each{|champion| lost += champion.stats.total_sessions_lost }
      lost
    end

    def total_champions_kills(stats) 
      kills = 0
      stats.each{|champion| kills += champion.stats.max_champions_killed }
      kills
    end

    def total_assists(stats) 
      assists = 0
      stats.each{|champion| assists += champion.stats.total_assists }
      assists
    end

    def total_deaths(stats) 
      deaths = 0
      stats.each{|champion| deaths += champion.stats.max_num_deaths }
      deaths
    end
end
