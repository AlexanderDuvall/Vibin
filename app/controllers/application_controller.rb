class ApplicationController < ActionController::Base
  include SessionsHelper
  include ActionController::MimeResponds
  protect_from_forgery with: :exception
  # call the configured params
  add_flash_types :danger, :info, :warning, :success

  def current_user
    @current_user ||= User.where(id: session[:user_id]).first
  end

  def current_playlist
    @playlist ||= Playlist(id: session[:playlist]).first;
  end

  helper_method :current_user
end
