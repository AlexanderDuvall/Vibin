module SongsHelper
  def testSong
    @songs = current_user.songs.all
    if (@songs[0].exists?)
      @songs[0].song_files
    else
      puts "NO SONG AVAILABLE"
    end
  end

  def incrementSongPlays
    #  song = Song.find(params[:id])
    #  if song.present?
    #    song.increment!(:plays)
    #  end
    puts "*******"
    puts "*******"
    puts "*******"


  end

  def getTopSong(genre)
    @songs = Song.find_by(:genre => genre).sort_by {|e| -e[:plays]}
    song = song.first
    song
  end

  def set_up_Post(post)
    3.times {post.songs.build}
    post
  end

  def getTopSong(genre)
    @song = Song.find_by(:genre => genre)
  end

  def add_song_view(name, f, association, **args)
    new_song = f.object.send(association).klass.new
    id = new_song.object_id
    fields = f.fields_for(association, new_song, child_index: id) do |builder|
      render partial: 'songs/append_song', locals: {f: builder}
    end
    link_to name, '#', id: "addSong", class: "btn btn-success", data: {id: id, fields: fields.gsub("\n", "")}
  end
end
