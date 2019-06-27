class MusicChannel < ApplicationCable::Channel
  def subscribed
    stream_from "music_channel"
  end
  def unsubscribed

  end

end
