class AlbumsController < ApplicationController

  def create
    @album = current_user.albums.new(strong_params)
    if @album.save!
      redirect_to root_url
    else
      redirect :new
    end
  end

  def new
    @album = Album.new
    @album.songs.build
    @album
  end

  def edit
  end

  def strong_params
    params.require(:album).permit(:title, :album_cover, songs_attributes: [:id, :title, :song_file, :cover_image, :premium, :user_id])
  end
end
