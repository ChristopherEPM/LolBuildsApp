require 'lol'
class Champion < ActiveRecord::Base
  serialize :tags, Array
  serialize :stats, Hash 
  serialize :spells, Array 
  serialize :passive, Hash



  def update_with_api

    if(!check_version)
      api_champions = get_api_champions
      api_champions.each do |champion|
        champ_found = Champion.find_by api_id: champion.id
        if(champ_found)
          update_champion(champ_found,champion)
        else
          create_new_champion(champion)
        end
      end
    end
  end

  def check_version
    client = Lol::Client.new ENV["RIOT_DEV_API_KEY"], {region: "euw"}
    api_version = client.static.versions.get[0]
    local_version = Gameversion.first.version
    api_version == local_version
  end

  def get_api_champions
    client = Lol::Client.new ENV["RIOT_DEV_API_KEY"], {region: "euw"}
    client.static.champion.get(champData: 'all')
  end

  def create_new_champion(championData)
    champion = Champion.create({
      api_id: championData.id, name: championData.name, key: championData.key, title: championData.title, image: championData.image["full"], tags: championData.tags, partype: championData.partype, stats: championData.stats, spells: championData.spells, passive: championData.passive
    })
  end

  def update_champion(champion,championData)
    champion.update_attribute({
      image: championData.image["full"], stats: championData.stats, spells: championData.spells, passive: championData.passive
    })
  end

end
