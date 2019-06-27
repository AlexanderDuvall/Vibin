class PlaylistsController < ApplicationController


  def create
    @playlists = current_user.playlists.new(:title => "#{current_user.name} 's Playlist")
    if @playlists.save!
      @songs = Song.all
      @songs.each_with_index do |f, index|
        @song_position = @playlists.song_positions.new(:song_id => f.id, :position => index + 1)
        @song_position.save!
      end
      redirect_to root_path
    end
  end

  def sort
    @var = params[:song_position]
    puts @var.inspect
    unless @var.nil?
      params[:song_position].each_with_index do |id, index|
        SongPosition.where(id: id).update_all(position: index + 1)
      end
    end
    puts "List reordered in DB.  #{Time.new.inspect}"
    head :ok
  end

  def songs
    @song_pos = Get_Positions
  end

  def index
    @song_position = current_user.playlists.first.song_positions.order(:position)
  end

  def new
    @playlists = Playlist.new
  end

  def getsongs
    puts "this is test 2: #{params[:id]}"
    @song = Song.find_by_id(params[:id])
    if @song.nil?
      puts "no song found"
    else
      puts @song.inspect
      render :json => {
          :song_url => url_for(@song.song_file),
          :username => User.find(@song.user_id).username,
          :title => @song.title
      }
    end
  end

  def show
    @playlists = current_user.playlists
    #  @song_position = current_user.playlists.first
    # @song_position = @song_position.song_positions.order(:position)
  end

  def get_positions
    puts "getting positions with cookies: #{cookies[:playlist]}"
    @song_position = Playlist.find_by_id(cookies[:playlist].to_i)
    puts @song_position.inspect
    @song_position = @song_position.song_positions.order(:position)
    render :json => {
        :song_position => @song_position
    }
  end



end
