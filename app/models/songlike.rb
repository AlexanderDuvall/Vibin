class Songlike < ActiveRecord::Base
  belongs_to :user
  belongs_to :song
  # has_one :song_position, dependent: :destroy
  def Songlike.reposition(default_id)
    @songs = Playlist.find(default_id).song_positions
    @songs.each_with_index do |val, index|
      val.update_attribute(:position, index + 1)
    end
  end

end
