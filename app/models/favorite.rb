class Favorite < ApplicationRecord
  attr_accessor :music_id, :count, :artist_id, :genre
  belongs_to :user
end
