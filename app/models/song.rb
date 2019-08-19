class Song < ApplicationRecord
  #include Elasticsearch::Model
  #include Elasticsearch::Model::Callbacks
  searchkick
  validates :title, presence: true, length: {maximum: 40}
  validates :premium, default: false
  has_one_attached :song_file
  has_one_attached :cover_image
  belongs_to :user, optional: true
  belongs_to :album, optional: true
  belongs_to :playlist, optional: true
  has_many :songlikes
  belongs_to :song_positions, optional: true
  has_many :songlikes
  has_many :user_song_play_counter
  has_one :total_song_play
  belongs_to :post, optional: true


  def Song.likeMusic?(song)
    song.songlikes.where(user_id: id).any?
  end
end
