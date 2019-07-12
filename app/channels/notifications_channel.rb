class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    puts "id:   #{current_user.id}"
    stream_from("notifications_#{current_user.id}_channel")
  end

  def unsubscribed
  end

  def send_message(data)
    conversation = Conversation.find_by(id: data['conversation_id'])
    if conversation && conversation.participates?(current_user)
      message = current_user.messages.build({body: data['message']})
      message.conversation = conversation
      message.save!
    end
  end
end
