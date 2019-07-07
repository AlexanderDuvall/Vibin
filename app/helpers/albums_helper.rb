module AlbumsHelper
  def setupAlbum
    album = current_user.albums.new
    album.songs.build()
    album
  end
end
