module PlaylistsHelper

  def Get_Positions
    #returns song pos
    song_position = Playlist.find_by_id(cookies[:playlist].to_i)
    puts "========="
    puts song_position
    puts "=========="
    if song_position != nil
      song_position = song_position.song_positions.order(:position)
      puts "-----------my mang help me----------- #{song_position.length}"
      puts song_position.inspect
      return song_position
    else
      puts "dont help me"
    end
  end

  def link_to_song (songpositions)
    song = Song.find_by(id: songpositions.song_id)
    link_to song.title, "", class: "list-group-item", id: dom_id(songpositions), :onclick => ("setNewPlaylistSong(#{songpositions.position.to_json})")
    song
  end


  def playlistToArray(id)
    @playlist = Playlist.find(id)
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

  def getPlaylistImage(id)
    if (!id.nil?)
      @playlist = Playlist.find(id)
      songs = @playlist.song_positions.order(:position)
      if (songs.nil? || songs.length == 0)
        return nil
      end
      song = Song.find songs[0].song_id
      url_for(song.cover_image)
    end
  end

  def getPlaylistImageURLforPlaylist(playlist, position)
    puts "#{playlist.inspect}, #{position.inspect} here ya go2"
    position = playlist.song_positions.find_by(position: position)
    puts "#{playlist.inspect}, #{position.inspect} here ya go"
    song = Song.find (position.song_id)
    url_for song.cover_image
  end
end
