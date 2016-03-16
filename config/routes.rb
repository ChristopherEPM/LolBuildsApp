Rails.application.routes.draw do
  get '/' => 'site#show_champions_greed'

  resources :backpacks 

  resources :champions do 
    resources :backpacks do 
      resources :items
      resources :runes
    end
  end

end
