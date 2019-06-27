class MessageroomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messageroom_channel"
  end
  def unsubscribed

  end

  def speak(data)
  Message.create content: data['message'], user: current_user
  end
end
