module PlaylistsHelper

  def Get_Positions
    @song_position = Playlist.find_by_id(cookies[:playlist].to_i)
    @song_position = @song_position.song_positions.order(:position)
    @song_position
  end

  def link_to_song (songpositions)
    song = Song.find_by(id: songpositions.song_id)
    link_to song.title, "", class: "list-group-item", id: dom_id(songpositions), :onclick => ("setNewPlaylistSong(#{songpositions.position.to_json})")
    song
  end


  def playlistToArray(id)
    @playlist = current_user.playlists.find_by_id(id)
    puts "id #{id}"
    puts "playlist #{@playlist}"
    if !@playlist.nil?
      @songs = @playlist.song_positions.order(:position)
      @song_ids = Array.new
      @songs.each do |f|
        @song_ids.push(f.song_id.to_int)
      end
      puts "-------------------------COMPARE------------------------------------------"
      puts @song_ids.inspect
      puts "--------------------------------------------------------------------"
      @song_ids
    end
  end


end
