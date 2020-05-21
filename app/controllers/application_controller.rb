class ApplicationController < ActionController::Base
  include SessionsHelper
  #include ActionController::MimeResponds
  protect_from_forgery with: :exception
  # call the configured params
  add_flash_types :danger, :info, :warning, :success
  #need before_action authenticate_user


  def current_playlist
    @playlist ||= Playlist(id: session[:playlist]).first;
  end


end