require "will_paginate/array"
class UsersController < ApplicationController
  before_action :logged_in_user, only: [:edit, :update, :destroy, :following, :followers]
  before_action :correct_user, only: [:edit, :update]
  before_action :admin_user, only: :destroy

  def index
    @users = User.search(params[:username])
  end

  def feed
    Post.where("user_id = ?", id)
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      @user.save UserMailer.account_activation(@user).deliver_now
      #log_in @user
      #flash[:success] = "Success!"
      flash[:success] = "Please check your email to activate your account."
      redirect_to root_url
    else
      flash[:error] = "Invalid, please try again"
      render 'new'
    end
  end

  def destroy
    User.find(params[:id]).destroy
    flash[:success] = "User deleted"
    redirect_to users_url
  end

  def show
    @user = User.find(params[:id])
    @posts = Post.all.where("user_id = ?", @user)

    @songs = Song.all.where("user_id = ?", @user)
    @likedsongs = Musiclike.all.where("user_id = ?", @user).reverse

    @combine = (@songs + @posts).sort_by {|post| post.created_at}.reverse.paginate(page: params[:page], per_page: 10)

  end

  def edit
    @currentuser = current_user
    @user = User.find(params[:id])

  end

  def change_password
    @user = User.find_by(email: params[:email])
  end

  def confirm_email
    user = User.find_by_confirm_token(params[:token])
    if user
      user.validate_email
      user.save(validate: false)
      redirect_to user
    else
      flash[:error] = "Sorry. User does not exist"
      redirect_to root_url
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      flash[:success] = "Profile updated"
      redirect_to @user
    else
      render "edit"
    end
  end

  def autocomplete
    render json: User.search(params[:term], fields: [{username: :text_start}], limit: 10).map(&:username)
  end

  def following
    @title = "following"
    @user = User.find(params[:id])
    @All = Relationship.all.where("follower_id = ?", @user)
    render "show_following"
  end

  def followers
    @title = "Followers"
    @user = User.find(params[:id])
    @All = Relationship.all.where("followed_id = ?", @user)
    render "show_followers"
  end


  private


  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :username, :name, :zipcode, :bio,
                                 :gender, :password, :password_confirmation,
                                 :birthday, :Terms_of_Agreement, :avatar)
  end

  def logged_in_user
    unless logged_in?
      store_location
      flash[:danger] = "Please log in"
      redirect_to login_url
    end
  end

  def correct_user
    @user = User.find(params[:id])
    redirect_to(root_url) unless current_user?(@user)
  end

  def admin_user
    redirect_to(root_url) unless current_user.activated?
  end

end
