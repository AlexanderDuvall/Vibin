class Playlist < ApplicationRecord
  belongs_to :user
  has_many :song_positions, :dependent => :destroy
  has_many :songs, through: :song_positions
  validates_presence_of :title
end
