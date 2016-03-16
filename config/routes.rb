Rails.application.routes.draw do
  get '/' => 'site#show_champions_greed'

  resources :champions do 
    resources :builds do 
      resources :objects
    end
  end

end
