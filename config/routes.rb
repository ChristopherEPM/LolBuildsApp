Rails.application.routes.draw do
  get '/' => 'site#home'

  resources :champions do 
    resources :builds do 
      resources :objects
    end
  end

end
