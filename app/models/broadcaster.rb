class Broadcaster < ApplicationRecord
  belongs_to :user
  has_one_attached :broadcast_cover

  def Broadcaster.new_key
    SecureRandom.uuid
  end
end