class Post < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  searchkick

  belongs_to :user
  belongs_to :post, optional: true
#  accepts_nested_attributes_for :songs, allow_destroy: true #, reject_if: proc{|a| a['song_files'].blank? || a['title'].blank?}
#has_many :songs, inverse_of: :post
  has_many_attached :images
  has_one_attached :avatar
  default_scope -> {order(created_at: :desc)}
  validates :user_id, presence: true
#validates :context, length: {minimum: 0}, presence: true
  validates :images, presence: false
  has_many :likes
# has_many :songs
  has_many :comments, dependent: :destroy

# has_many :songs, inverse_of: :post, dependent: :destroy
#  accepts_nested_attributes_for :songs, reject_if: proc { |attributes| attributes[:name].blank?}, allow_destroy: true
# validate :correct_file_type?


#def correct_file_type?
# if images.attached? && !images.content_type.in?(%w(image/png, image/jpeg, image/tiff))
#  errors.add(:images, "Incorrect format ")
#end

#end

  def post_type
    if post_id? && context?
      "repost"
    elsif post_id?
      "repost"
    else
      "post"
    end
  end

  def age(x, y)
  end

end
