class Songs::LikesController < ApplicationController
  before_action :logged_in?
  before_action :set_song

  def create
    song_id = @song.id
    if @song.songlikes.where(user_id: current_user.id)
      if @song.songlikes.new(user_id: current_user.id).save!
        @defaultPlaylist = current_user.playlists.find_by :default => true
        lastPos = @defaultPlaylist.song_positions.exists? ? @defaultPlaylist.song_positions.last.position + 1 : 1
        @song_position = @defaultPlaylist.song_positions.new(:song_id => song_id, :position => lastPos)
        unless @defaultPlaylist.song_positions.exists?(:song_id => song_id)
          if @song_position.save!
            respond_to do |format|
              format.html {redirect_to @song}
              format.js
            end
          end
        end
      else
      end
    end
  end

  def destroy
    song_id = @song.id
    @song.songlikes.where(user_id: current_user.id).destroy_all
    default_playlist = current_user.playlists.find_by :default => true
    default_playlist.song_positions.where(:song_id => song_id).destroy_all
    respond_to do |format|
      format.html {redirect_to @song}
      format.js
    end
    Songlike.reposition(default_playlist.id)

  end

  private

  def set_song
    @song = Song.find(params[:song_id])

  end
end
