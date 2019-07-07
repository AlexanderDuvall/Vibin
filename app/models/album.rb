class Album < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, length: {maximum: 100}
  #validates :album_files, presence: true
  has_many :songs
  accepts_nested_attributes_for :songs,
                                :allow_destroy => true,
                                :reject_if => :all_blank
end
