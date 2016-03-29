Rails.application.routes.draw do
  get '/' => 'site#show_champions_greed', as: "root"
  get '/items' =>'items#show'
  get '/summoner' =>'summoners#show'
  resources :backpacks
  resources :champions do 
    resources :backpacks do 
      resources :items
      resources :runes
    end
  end

end
