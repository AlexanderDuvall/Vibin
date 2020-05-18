class ApplicationController < ActionController::Base
  include SessionsHelper
  #include ActionController::MimeResponds
  protect_from_forgery with: :exception
  # call the configured params
  add_flash_types :danger, :info, :warning, :success
  #need before_action authenticate_user


  skip_before_action :verify_authenticity_token
  helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!
  def login!
    session[:user_id] = @user.id
  end
  def logged_in?
    !!session[:user_id]
  end
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  def authorized_user?
    @user == current_user
  end
  def logout!
    session.clear
  end

  def current_playlist
    @playlist ||= Playlist(id: session[:playlist]).first;
  end


end