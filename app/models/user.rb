class User < ActiveRecord::Base
  searchkick text_start: [:username, :name]

  def search_data
    {
        username: username,
        name: name
    }
  end

  attr_accessor :remember_token, :reset_token
  before_create :set_confirmation_token
  has_many :active_relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :songs
  has_many :passive_relationships, class_name: "Relationship", foreign_key: "followed_id", dependent: :destroy
  has_many :followers, through: :passive_relationships, source: :follower
  has_many :albums
  has_one_attached :avatar
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: {maximum: 255},
            format: {with: VALID_EMAIL_REGEX}, uniqueness: {case_sensitive: false}
  validates :name, presence: true
  validates :username, presence: true, uniqueness: true
  validates :Terms_of_Agreement, presence: true
  validates :zipcode, presence: true
  validates :gender, presence: true
  validates :birthday, presence: true
  validates :bio, length: {maximum: 250}
  validates :avatar, presence: true
  has_secure_password
  validates :password_digest, presence: true, length: {minimum: 6}, allow_nil: true
  has_many :albumlikes
  has_many :favorites
  has_many :songs, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :likes
  has_many :messages, dependent: :destroy
  has_many :playlists, dependent: :destroy
  has_many :sended_conversations, class_name: 'Conversation', foreign_key: "sender_id"
  has_many :received_conversations, class_name: 'Conversation', foreign_key: "received_id"
  has_many :user_song_play_counters
  has_many :user_artist_play_counters
  has_many :songlikes
  has_one :broadcaster
  # Remembers a user in the database for use in persistent sessions.

  def as_indexed_json(_options = {})
    {
        name: "#{name}",
        suggest: {
            input: [name],
            output: "name",
            payload: {id: id, name: name}
        }
    }
  end

  # class method to execute autocomplete search
  def self.auto_complete(q)
    return nil if q.blank?

    search_definition = {
        'name-suggest' => {
            text: q,
            completion: {
                field: 'suggest'
            }
        }
    }

    __elasticsearch__.client.perform_request('GET', "#{index_name}/_suggest", {}, search_definition).body['name-suggest'].first['options']
  end


  def remember
    # the cookie
    self.remember_token = User.new_token
    #saving hash of cookie to db
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  # Forgets a user.
  def forget
    update_attribute(:remember_digest, nil)
  end

  def follow(other_user)
    following << other_user
  end

  def unfollow(other_user)
    following.delete(other_user)
  end

  def following?(other_user)
    following.include?(other_user)
  end

  def feed
    following_ids = "SELECT followed_id FROM relationships
                        WHERE  follower_id = :user_id"
    Post.where("user_id IN (#{following_ids})
                        OR user_id = :user_id", user_id: id)
  end

  def likePost?(post)
    post.likes.where(user_id: id).any?
  end

  def likeMusic?(song)
    song.songlikes.where(user_id: id).any?
  end

  def create_reset_digest
    self.reset_token = User.new_token
    update_attribute(:reset_digest, User.digest(reset_token))
    update_attribute(:reset_sent_at, Time.zone.now)
  end

  def send_password_reset_email
    UserMailer.password_reset(self).deliver_now
  end

  def password_reset_expired?
    reset_sent_at < 2.hours.ago
  end

  def send_password_reset
    generate_token(:reset_digest)
    self.reset_sent_at = Time.zone.now
    save!
    UserMailer.password_reset(self).deliver_now
  end

  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end

  def validate_email
    self.email_confirmed = true
    self.confirm_token = nil
  end

  def activated?
    if self.email_confirmed
      return true;
    else
      return false;
    end
  end


  private

  def set_confirmation_token
    if self.confirm_token.blank?
      self.confirm_token = SecureRandom.urlsafe_base64.to_s
    end
  end

  def User.new_token
    SecureRandom.urlsafe_base64
  end

  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
               BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

end
