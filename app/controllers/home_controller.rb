require "will_paginate/array"
class HomeController < ApplicationController
  before_action :logged_in?, only: [:index, :edit, :update, :destroy, :following, :followers]
  before_action :correct_user, only: [:edit, :update]
  before_action :set_post, only: [:show, :edit, :update, :destroy]


  # back-end code for pages/home
  def home
    @user = current_user
    @recommendedSongs = Song.all.where("genre = ?", "NULL")
    # @songs = Array.new
    #following = Array.new
    #following.push(current_user.id)
    #for @f in current_user.following do
    #  following.push(@f.id)
    #end
    #@posts = Post.where("user_id IN (?)", following)
    #@userpost = Post.all.where("user_id = ?", current_user.id)
    #@followers = Relationship.all.where("followed_id = ?", current_user.id)
    #@following = Relationship.all.where("follower_id = ?", current_user.id)
    if logged_in?
      # array with current_user id
      @asss = [current_user]
      # array of following row ids the current user is in
      @followingRows = Relationship.all.where("follower_id = ?", current_user)
      @followingRows.each do |a|
        #append following user's id
        @asss.push(a.followed_id)
      end
      @userpost = Post.all.where("user_id IN (?) ", @asss)
      @usersongpost = Song.all.where("user_id IN (?) ", @asss)
      @posts = @userpost
      @combine = (@usersongpost + @posts).sort_by {|post| post.created_at}.reverse.paginate(page: params[:page], per_page: 10)
    end
  end

  # back-end code for pages/profile
  def profile
    # grab the username from the URL as :id
    @user = User.find(session[:user_id])
    #@followers = Relationship.all.where("followed_id = ?", User.find_by_username(params["id"]).id)
    #@following = Relationship.all.where("follower_id = ?", User.find_by_username(params["id"]).id)
    #@posts = Post.all.where("user_id = ?", User.find_by_username(params["id"]).id)
  end

  def profileMusic
    if current_user
      @user = User.find_by_username params[:id]
      @followers = Relationship.all.where("followed_id = ?", User.find_by_username(params["id"]).id)
      @following = Relationship.all.where("follower_id = ?", User.find_by_username(params["id"]).id)
      @posts = Post.all.where("user_id = ?", User.find_by_username(params["id"]).id)
      @follow = Relationship.all.where("follower_id = ?", User.find_by_username(params["id"]).id)
    end
  end

  # back-end code for pages/explore
  def explore
    @users = User.all
  end

  def groupies

  end

  def search
    query = params[:term].presence || "*"
    @searchUsers = User.search(query)
    @searchSongs = Song.search(query)
    @searchPosts = Post.search(query)
  end

  def autocomplete
    render json: ["test"]
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :name, :zipcode, :avatar,
                                 :gender, :password, :password_confirmation,
                                 :birthday, :Terms_of_Agreement)
  end

  def set_post
    @post = Post.find(params[:id])
  end


  def song_params
    params.require(:song).permit(:user_id, :title, :text, :genre, :song_file)
  end

  def set_song
    @songpost = Song.find(params[:id])
  end
end
