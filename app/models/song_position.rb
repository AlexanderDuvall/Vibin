class SongPosition < ApplicationRecord
 # belongs_to :songlike, optional: true
  belongs_to :playlist
  has_one :song
end
