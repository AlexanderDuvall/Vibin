class SongsController < ApplicationController
  before_action :logged_in_user, only: [:create, :destroy]
  # before_action :correct_user, only: [:create, :destroy]
  #before_action :set_song, only: [:show]


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

  def isLikedSong
    song_id = params[:song_id]
    result = helpers.LikeButtonSet?(song_id, current_user)
    render :json => {
        class: result
    }
  end

  def getTopSong
    genre = params[:genre]
    puts "-----------------genre-----------#{genre}"
    @song = Song.where(genre: genre.to_s)
    puts @song
    @song = @song.sort_by {|e| -e[:plays]}
    @song = @song.first
    unless @song.nil?
      render :json => {
          id: @song.id,
          username: User.find(@song.user_id).username,
          name: User.find(@song.user_id).name,
          user_id: @song.user.id,
          song_file: url_for(@song.song_file),
          cover: url_for(@song.cover_image),
          title: @song.title
      }
    else
      render :json => {
          id: -1
      }
    end
  end

  def incrementSongPlays
    if current_user.present?
      @artistCounter = UserArtistPlayCounter.where(user_id: current_user, artist_id: params[:artist_id]).first_or_create
      @songCounter = UserSongPlayCounter.where(user_id: current_user, song_id: params[:id]).first_or_create
      if @songCounter.plays == ""
        puts "null"
        @songCounter.plays = 1
      else
        puts "increment"
        @songCounter.increment!(:plays)
      end
      if @artistCounter.plays == ""
        puts "null"
        @artistCounter.plays = 1
      else
        puts "increment"
        @artistCounter.increment!(:plays)
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

  def like_song
    song_id = params[:id]
    if (Song.likeMusic?(2))
      Songlike.find_by(:user_id => current_user.id, :song_id => song_id)
    else
      @songlike = current_user.songlikes
    end
  end


  private

  def song_params
    params.require(:song).permit(:title, :song_file, :cover_image, :premium, :subGenre, :genre)
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
