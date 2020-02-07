module LikesHelper
  def isSongLiked(song_id, user_id)
    song = Song.find(song_id)
    record = song.songlikes.where(user_id: user_id)
    if (record.length == 0)
      return false
    end
    return true
  end

  def LikeButtonSet?(song_id, user_id)
    if isSongLiked(song_id, user_id)
      return 1
    end
    return 0
  end
end
