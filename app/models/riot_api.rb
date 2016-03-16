class RiotApi < ActiveRecord::Base

  # RIOT_API_URL = "https://euw.api.pvp.net/api/lol/na/v1.4/summoner/by-name/Biman?api_key=#{ENV['dev_api_key']}"
  # REQUEST_DEFAULTS = { :parse? => true }

  # --- code guide lines ---
  
  # def self.uri(path)
  #   url_string = "#{POKEMON_API_URL}/#{path}/"
  #   return URI.parse(url_string)
  # end

  # def self.request(path, given_options = {})
  #   options = REQUEST_DEFAULTS.merge(given_options)

  #   uri = self.uri(path)
  #   response = Net::HTTP.get_response(uri)
  #   body = response.body

  #   if options[:parse?]
  #     body = JSON.parse(body)
  #   end

  #   return body
  # end

end
