class PlaylistsController < ApplicationController


  def create
    @playlists = nil
    if (current_user.playlists)
      @playlists = current_user.playlists.new(:title => "Liked Music", :default => true)
    else
      @playlists = current_user.playlists.new(:title => "Playlist #{current_user.id}", :default => false)
    end
    if @playlists.save!
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
    puts "List reordered in DB. #{Time.new.inspect}"
    get_positions
  end

  def songs

    puts "params of shuffle: #{params[:shuffle]}"
    @shuffled = params[:shuffle] if (!params[:shuffle].nil? && @shuffled.nil?) || (@shuffled != params[:shuffle] && !params[:shuffle].nil?)
    if @shuffled.eql?("true")
      @pos = params[:data].split(",")
      positions = @pos.map(&:to_i)
      pos = Playlist.find(params[:playlist])
      puts positions.inspect
      song_pos = pos.song_positions
      song_pos = song_pos.sort_by {|s| positions.index(s.song_id)}
      puts song_pos.inspect
      test = "made it this far"
      render :partial => "playlists/songs", locals: {song_pos: song_pos, ts: test}
    else
      pos = Playlist.find(params[:playlist])
      song_pos = pos.song_positions
      puts song_pos.inspect
      test = "nenenen"
      render :partial => "playlists/songs", locals: {song_pos: song_pos, ts: test}
    end


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
          :title => @song.title,
          :cover => url_for(@song.cover_image),
          :genre => @song.genre,
          :subgenre => @song.subGenre,
          :avatar => url_for(@song.user.avatar)
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
    song_position = Playlist.find_by_id(cookies[:playlist].to_i)
    song_position = song_position.song_positions.order(:position)
    array = Array.new
    song_position.each do |f|
      array.push(f.song_id)
    end
    render :json => {
        :id => array
    }
    array
  end
end
