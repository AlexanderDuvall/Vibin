class Album < ApplicationRecord
  belongs_to :user
  has_many_attached :album_files
  validates :title, presence: true, length: {maximum: 100}
  validates :album_files, presence: true

 end
