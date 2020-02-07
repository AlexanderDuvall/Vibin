class Songs::LikesController < ApplicationController
  before_action :logged_in?
  before_action :set_song

  def create
    song_id = @song.id
    var = @song.songlikes.where(user_id: current_user.id)
    if var.length == 0
      if @song.songlikes.new(user_id: current_user.id).save!
        @defaultPlaylist = current_user.playlists.find_by :default => true
        lastPos = @defaultPlaylist.song_positions.exists? ? @defaultPlaylist.song_positions.last.position + 1 : 1
        @song_position = @defaultPlaylist.song_positions.new(:song_id => song_id, :position => lastPos)
        unless @defaultPlaylist.song_positions.exists?(:song_id => song_id)
          @song_position.save!
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
    Songlike.reposition(default_playlist.id)

  end

  private

  def set_song
    @song = Song.find(params[:song_id])

  end


end
