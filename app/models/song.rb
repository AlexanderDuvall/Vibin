class Song < ApplicationRecord
  #include Elasticsearch::Model
  #include Elasticsearch::Model::Callbacks
  #searchkick

  has_one_attached :song_file
  has_one_attached :cover_image
  belongs_to :user, optional: true
  belongs_to :album, optional: true
  belongs_to :playlist, optional: true
  has_many :musiclikes
  belongs_to :song_positions, optional: true
  #validates :premium
  #belongs_to :post, optional: true
  validates :title, presence: true, length: {maximum: 40}


end
