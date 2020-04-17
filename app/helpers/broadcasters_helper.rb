module BroadcastersHelper
  def getKey
    if logged_in? && Broadcaster.exists?(user_id: current_user.id)
      Broadcaster.find_by(user_id: current_user.id).broadcast_key
    end
  end
end
