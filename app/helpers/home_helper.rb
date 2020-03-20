module HomeHelper

  def age(x, y)
    difference = (x - y) / 60
    if (difference > 60)
      difference = difference / 60
      if (difference > 24)
        difference = difference / 24
        return "#{difference.floor} days"
      else
        return "#{difference.floor} hrs"
      end
    else
      return "#{difference.floor} mins."
    end
  end

  def conversation(current_user, other)
    if @convo = Conversation.where(sender_id: current_user, receiver_id: other).first
      "existing dm"
    else
      "new convo"
    end
  end

  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    elsif (user_id = cookies.signed[:user_id])
      user = User.find_by(id: user_id)
      if user && user.authenticated?(cookies[:remember_token])
        log_in user
        @current_user = user
      end
    end
  end

  def dayYear(x)
    return "#{x.day}, #{x.year}"
  end

  def getUserFavArtist(user_id)
    puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!lol"
#    favArtist = User_artist_play_counter.find_by("user_id": 97).order("plays": :desc)
#puts favArtist
    puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  end

  def getUserFavSong(user_id)

  end

  def getArtist(song)
    if (!song.user_id.nil?)
      song.user
    elsif (!song.album_id.nil?)
      song.album.user
    elsif (!song.playlist_id.nil?)
      song.playlist.user
    else
      puts "bad record...."
      nil
    end
  end

  def log_in(user)
    session[:user_id] = user.id
  end

  def get_favorite_song(user)
    a = user.user_song_play_counters.order("plays desc")[0]
    song = Song.find(a.song_id)
    title = song.title
    return title
  end

  def get_favorite_artist(user)

  end

  def month(x)
    case (x.month)
    when 1
      month = "January"
    when 2
      month = "February"
    when 3
      month = "March"
    when 4
      month = "April"
    when 5
      month = "May"
    when 6
      month = "June"
    when 7
      month = "July"
    when 8
      month = "August"
    when 9
      month = "September"
    when 10
      month = "October"
    when 11
      month = "November"
    when 12
      month = "December"
    end
    return "#{month}"
  end


end
