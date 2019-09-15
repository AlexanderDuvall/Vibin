class Album < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, length: {maximum: 100}
  has_many :songs, inverse_of: :album, dependent: :destroy
  has_one_attached :album_cover
  validates :album_cover, presence: true
  accepts_nested_attributes_for :songs,
                                :allow_destroy => true
end
