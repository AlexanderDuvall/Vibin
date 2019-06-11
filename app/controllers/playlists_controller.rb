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
      puts "not null"
      params[:song_position].each_with_index do |id, index|
        SongPosition.where(id: id).update_all(position: index + 1)
      end
    end
    head :ok
  end


  def index
    @song_position = current_user.playlists.first
    @song_position = @song_position.song_positions.order(:position)
  end

  def new
    @playlists = Playlist.new
  end

  def show
    @playlists = current_user.playlists
  end
end
