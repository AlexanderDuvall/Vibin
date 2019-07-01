class Message < ApplicationRecord
  belongs_to :user
  validates :content, presence: true
  validates :receiver, presence: true
  scope :for_display, -> { order(:created_at).last(50) }
end
