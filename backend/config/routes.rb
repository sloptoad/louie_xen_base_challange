Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :invoices do
    member do
      post :complete
      post :pay
      post :ship
      post :void
    end
  end
end
