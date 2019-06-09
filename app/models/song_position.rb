class SongPosition < ApplicationRecord
  belongs_to :playlist
  has_one :song
 end
