module PlaylistsHelper
  def link_to_song (songpositions)
    song = Song.find_by(id: songpositions.song_id)
    link_to song.title, song, class: "list-group-item", id: dom_id(songpositions)
  end
end
