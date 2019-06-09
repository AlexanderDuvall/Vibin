class Songs::LikesController < ApplicationController
before_action :logged_in?
before_action :set_song

 def create
   @song.musiclikes.where(user_id: current_user.id).first_or_create

   respond_to do |format|
     format.html {redirect_to @song}
     format.js
   end
 end

 def destroy
@song.musiclikes.where(user_id: current_user.id).destroy_all

respond_to do |format|
  format.html {redirect_to @song}
  format.js
end
 end

 private
    def set_song
      @song = Song.find(params[:song_id])
    end
end
