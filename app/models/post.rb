class Post < ApplicationRecord
  #include Elasticsearch::Model
  #include Elasticsearch::Model::Callbacks
  #searchkick

  belongs_to :user
#  accepts_nested_attributes_for :songs, allow_destroy: true #, reject_if: proc{|a| a['song_files'].blank? || a['title'].blank?}
#has_many :songs, inverse_of: :post
  has_many :posts
  has_many_attached :images
  default_scope -> {order(created_at: :desc)}
  validates :user_id, presence: true
  validates :context, presence: false
  validates :images, presence: false
  has_many :likes
# has_many :songs
  has_many :comments, dependent: :destroy


  def post_type
    if post_id? && context?
      "quote"
    elsif !context? && post_id?
      "repost"
    else
      "post"
    end
  end

  def age(x, y)
  end

end
