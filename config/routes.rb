Rails.application.routes.draw do
  #mount ActionCable.server, at: '/cable'
  resources :users do
    member do
      get :following, :followers, :autocomplete
    end
  end
  resources :account_activations, only: [:edit]
  resources :password_resets
  resources :broadcasters
  resources :messages, only: [:new, :create]
  # resources :conversations, only: [:index, :show, :search, :new]
  resources :songs, only: [:create, :destroy]
  resources :songs do
    resource :like, module: :songs
  end
  resources :albums

  resources :playlists do
    collection do
      patch :sort
      get :get_positions, :existsinPlaylist
    end
    member do
      get :getsongs
    end
  end
  resources :song_positions
  resources :posts, only: [:create, :destroy]
  resources :posts do
    post :repost
    resource :like, module: :posts
  end
  resources :relationships, only: [:create, :destroy]

  root 'home#home'
  get '/search' => 'home#search'
  get '/explore' => 'home#explore'
  get '/new_broadcaster' => 'broadcasters#new'
  get '/groupies' => 'home#groupies'
  get '/search' => 'home#search'
  get '/settings/:id' => 'users#settings'
  get '/users/:id' => 'home#profile'
  get '/users/:id/following' => 'users#show_following'
  get '/users/:id/followers' => 'users#show_followers'
  get 'broadcasters/index'
  get 'broadcasters/setup'
  get 'broadcasters/show'
  get '/topSong', to: 'songs#getTopSong'
  get 'broadcasters/settings'
  get '/playCounter' => "songs#incrementSongPlays"
  get 'playlists/create'
  get 'playlists/new'
  patch '/decrement' => 'broadcasters#decrement'
  patch '/increment' => 'broadcasters#increment'
  get 'playlists/show'
  get '/getsongs' => 'playlists#getsongs'
  get '/getbroadcaster' => 'broadcasters#get_broadcaster'
  get '/get_playlist_songs' => 'playlists#get_positions'
  get '/posts/:post_id' => 'posts#show'
  post '/repost/:id' => 'posts#repost'
  get 'songs/:id' => 'songs#show'
  get '/signup' => 'users#new'
  get '/login', to: 'sessions#new'
  get '/settings', to: 'users#edit'
  get '/password_reset', to: 'password_resets#new'
  get '/privacy_settings', to: 'privacy_settings#edit'
  get '/deactivate_current_user', to: 'users#deactivate'
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
  get '/new_song' => 'songs#new'
  get '/playlists' => 'playlists#index'
  get '/new_playlist' => 'playlists#new'
  get '/get_song_positions' => 'playlists#songs'
  get '/shuffle' => 'playlists#songs'
  post '/add_to_playlist' => 'playlists#addToPlaylist'
  get '/exists_in_playlist' => 'playlists#existsinPlaylist'
  post 'remove_from_playlist' => 'playlists#removeFromPlaylist'
  #  get '/livestream' => 'audio#stream'
  delete '/playlists', to: 'playlists#destroy'
end
