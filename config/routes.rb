Rails.application.routes.draw do
  get 'playlists/create'
  get 'playlists/new'
  get 'playlists/show'
  root 'home#home'
  # Define routes for Pages
  get '/home' => 'home#home'
  get '/explore' => 'home#explore'
  get '/groupies' => 'home#groupies'
  get '/search' => 'home#search'
  resources :users do
    member do
      get :following, :followers, :autocomplete
    end
  end
  get '/users/:id' => 'home#profile'
  get '/users/:id/following' => 'users#show_following'
  get '/users/:id/followers' => 'users#show_followers'
  get '/users/:id/Music' => 'home#profileMusic'
  get '/getsongs' => 'playlists#getsongs'
  get '/get_playlist_songs' => 'playlists#get_positions'
  resources :playlists do
    collection do
      patch :sort
      get :get_positions
    end
    member do
      get :getsongs
    end
  end
  resources :song_positions
  resources :posts, only: [:create, :destroy]
  resources :posts do
    resource :like, module: :posts
    member do
      post :repost
    end
  end
  get '/posts/:post_id' => 'posts#show'

  get 'songs/:id' => 'songs#show'
  get '/signup' => 'users#new'
  get '/login', to: 'sessions#new'
  get '/settings', to: 'users#edit'
  get '/password_reset', to: 'password_resets#new'
  get '/privacy_settings', to: 'privacy_settings#edit'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get 'users/:id/add_album', to: 'albums#new'
  get 'albums/new'
  get 'albums/create'
  get 'albums/edit'
  get 'music/destroy'
  get 'privacy_settings/edit'
  get 'privacy_settings/update'
  get 'password_resets/create'
  get 'password_resets/edit'
  get 'password_resets/update'
  get 'password_resets/new'
  get '/:token/confirm_email/', :to => "users#confirm_email", as: 'confirm_email'
  #get 'users/index'
  get '/new_song' => 'songs#new'
  get '/playlists' => 'playlists#index'
  get '/new_playlist' => 'playlists#new'
  resources :account_activations, only: [:edit]
  resources :password_resets
  resources :songs, only: [:create, :destroy]
  resources :songs do
    resource :like, module: :songs
  end
  resources :albums

  resources :relationships, only: [:create, :destroy]

  #  get '/livestream' => 'audio#stream'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
