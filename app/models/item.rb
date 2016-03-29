class Item < ActiveRecord::Base
  serialize :from, Array
  serialize :into, Array 
  serialize :maps, Hash 
  serialize :stats, Hash 
  serialize :gold, Hash 
  serialize :effect, Hash 
  


  def update_with_api
    if(!check_version)
      api_items = get_api_items
      api_items.each do |item|
      item_found = Item.find_by api_id: item.id
        if(item_found)
          update_item(item_found,item)
        else
          create_new_item(item)
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

  def get_api_items
    client = Lol::Client.new ENV["RIOT_DEV_API_KEY"], {region: "euw"}
    all_items = client.static.item.get(itemListData:"all")
    items_map11 = all_items.select{|item| item.maps['11'] == true }
    no_required_champ = items_map11.select{|item| !item.requiredChampion }
    no_consumable = no_required_champ.select{|item| (item.tags == nil && item.name.include?('Enchantment'))||(item.tags != nil && !item.tags.include?('Consumable') && !item.tags.include?('Trinket'))}#&& ((!item.tags.include?('Trinket') && !item.tags.include?('Consumable')) && (!item.name.include?('Poro') && !item.name.include?('Biscuit'))) }
    with_stats = no_consumable.select{|item| (item.tags && item.stats) || item.name == "Enchantment: Alacrity" || item.name == "Enchantment: warrior" || item.name == "Enchantment: Cinderhulk" || item.name == "Enchantment: Runic Echoes" || item.name == "Enchantment: Devourer" }
    no_items_with_bugs = with_stats.select{|item| ![3301,3672,3674,3673,3932,3930,3931,1041,3096,1006,30241,1004,3069,30241,3114,3241,3706,3711,3715,1039].include? item.id }
    no_items_with_bugs
  end

  def create_new_item(itemData)
    item = Item.create({
      api_id: itemData.id, name: itemData.name, group: itemData.group, description: itemData.description, sanitizedDescription: itemData.sanitizedDescription, depth: itemData.depth, from: itemData.from, into: itemData.into, maps: itemData.map, image: itemData.image["full"], stats: itemData.stats, gold: itemData.gold, effect: itemData.effect
    })
  end



  def update_item(item,itemData)
    item.update_attribute({
      description: itemData.description, sanitizedDescription: itemData.sanitizedDescription, depth: itemData.depth, from: itemData.from, into: itemData.into, maps: itemData.map, image: itemData.image["full"], stats: itemData.stats, gold: itemData.gold, effect: itemData.effect
    })
  end

end
