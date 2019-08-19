class AlbumsController < ApplicationController

  def create
    @album = current_user.albums.new(strong_params)
    if @album.save!
      redirect_to root_url
    end
  end

  def new
    @album = Album.new
    @album
  end

  def edit
  end

  def strong_params
    params.require(:album).permit(
        :title, :album_cover,
        songs_attributes: [:id, :title, :song_file, :cover_image, :premium, :subGenre, :genre, :user_id])
  end
end
