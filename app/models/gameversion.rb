require 'lol'
class Gameversion < ActiveRecord::Base

  def update_with_api
    client = Lol::Client.new ENV["RIOT_DEV_API_KEY"], {region: "euw"}
    api_version = client.static.versions.get[0]
    local_version = Gameversion.first.version
    if(api_version != local_version)
      update_version(api_version,local_version)
    end
  end

  def update_version(apiv,localv)
    localv.update_attribute({
      version: apiv
    })
  end
  
end
