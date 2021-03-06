require 'lol'

client = Lol::Client.new ENV["RIOT_DEV_API_KEY"], {region: "euw"}
champions =  client.static.champion.get(champData: 'all')
version = client.static.versions.get[0]

all_items = client.static.item.get(itemListData:"all")
items_map11 = all_items.select{|item| item.maps['11'] == true }
no_required_champ = items_map11.select{|item| !item.requiredChampion }
no_consumable = no_required_champ.select{|item| (item.tags == nil && item.name.include?('Enchantment'))||(item.tags != nil && !item.tags.include?('Consumable') && !item.tags.include?('Trinket'))}#&& ((!item.tags.include?('Trinket') && !item.tags.include?('Consumable')) && (!item.name.include?('Poro') && !item.name.include?('Biscuit'))) }
with_stats = no_consumable.select{|item| (item.tags && item.stats) || item.name == "Enchantment: Alacrity" || item.name == "Enchantment: warrior" || item.name == "Enchantment: Cinderhulk" || item.name == "Enchantment: Runic Echoes" || item.name == "Enchantment: Devourer" }
no_items_with_bugs = with_stats.select{|item| ![3301,3672,3674,3673,3932,3930,3931,1041,3096,1006,30241,1004,3069,30241,3114,3241,3706,3711,3715,1039].include? item.id }

Gameversion.create({version: version})


champions.each do |champion|
  Champion.create({
    api_id: champion.id, name: champion.name, key: champion.key, title: champion.title, image: champion.image["full"], tags: champion.tags, partype: champion.partype, stats: champion.stats, spells: champion.spells, passive: champion.passive
  })
end

no_items_with_bugs.each do |item|
  Item.create({
    api_id: item.id, name: item.name, group: item.group, description: item.description, sanitizedDescription: item.sanitizedDescription, depth: item.depth, from: item.from, into: item.into, maps: item.map, image: item.image["full"], stats: item.stats, gold: item.gold, effect: item.effect
    })
end 