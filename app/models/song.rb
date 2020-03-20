class Song < ApplicationRecord
  #include Elasticsearch::Model
  #include Elasticsearch::Model::Callbacks
 # searchkick
  validates_presence_of :title, presence: true, length: {maximum: 40}
  validates_presence_of :premium, default: false, presence: false
  validates_presence_of :subGenre, default: ""
# validates_presence_of :premium, default: false
  has_one_attached :song_file
  has_one_attached :cover_image
  belongs_to :user, inverse_of: :songs, optional: true
  belongs_to :album, inverse_of: :songs, optional: true
  belongs_to :playlist, inverse_of: :songs, optional: true
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
