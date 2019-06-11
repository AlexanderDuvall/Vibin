module PlaylistsHelper
  def link_to_song (songpositions)
    song = Song.find_by(id: songpositions.song_id)
    song_link = link_to song.title, song, id: dom_id(songpositions)
    image_link = image_tag song.cover_image, size: "100x100"
    return song, song_link, image_link
  end


  def PlaylistToArray(id)
    @playlist = current_user.playlists.find_by_id(id)
    @songs = @playlist.song_positions
    @song_ids = Array.new
    @songs.each do |f|
      @song_ids.push(f.song_id.to_int)
    end
    puts @song_ids.inspect
    @song_ids
  end

  def getsongs
    puts "this is test 2 #{params[:id]}"
    @song = Song.find_by_id(params[:id])
    if @song.nil?
      puts "nil"
    else
      puts "-----------------------------"
      puts "not nil"
      puts "-----------------------------"
    end
  end
end