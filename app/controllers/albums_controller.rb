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
  end

  def edit
  end

  def strong_params
    params.require(:album).permit(:title, album_files: [])
  end
end
