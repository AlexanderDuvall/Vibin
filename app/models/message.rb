class Message < ApplicationRecord
  belongs_to :user
  belongs_to :conversation
  validates :content, presence: true

  after_create_commit do
    conversation.touch
    NotificationBroadcastJob.perform_later(self)
  end
end
