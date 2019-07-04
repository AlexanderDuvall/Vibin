class SongsController < ApplicationController
  before_action :logged_in_user, only: [:create, :destroy]
  # before_action :correct_user, only: [:create, :destroy]
  #before_action :set_song, only: [:show]
  #  respond_to :js, :json, :html

  def create
    @song = current_user.songs.new(song_params) #, :post_id => @post.id)
    respond_to do |format|
      if @song.save!
        format.js
        format.html {redirect_to @song, notice: 'Song was successfully created.'}
        format.json {render :show, status: :created, location: @song}
      else
        format.html {render :new}
        format.json {render json: @song.errors, status: :unprocessable_entity}
      end
    end
  end

  def incrementSongPlays
    @songCounter = UserSongPlayCounter.where(user_id: current_user, song_id: params[:id]).first_or_create
    if @songCounter.plays == ""
      puts "null"
      @songCounter.plays = 1
    else
      puts "increment"
      @songCounter.increment!(:plays)
    end
    puts "*******"
    puts "*******"
    puts "*******"
    puts params[:id]
    puts "*******"
    puts "*******"
    puts "*******"
    song = Song.find(params[:id])
    if song.present?
      song.increment!(:plays)
      puts song.plays
    end
    puts "*******"
    puts "*******"
    puts "*******"
  end

  def edit
  end

  def new
    @song = Song.new(params[:id])
  end

  def destroy
  end

  def show
    @song = Song.find(params[:id])
  end

  def music
    @songs = Song.all
  end

  def show_music
    @songs = Song.all
  end

  private

  def song_params
    params.require(:song).permit(:title, :song_file, :cover_image)
  end

  def set_song
    @song = Song.find(params[:id])
  end

  def correct_user
    redirect_to(root_url) unless current_user?(@user)
  end

  def logged_in_user
    unless logged_in?
      store_location
      flash[:danger] = "Please log in"
      redirect_to login_url
    end
  end

end
