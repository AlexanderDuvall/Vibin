class BroadcastersController < ApplicationController


  def index
    @broadcasters = Broadcaster.where("is_playing =(?)", true)
  end

  def create
    @broadcaster = Broadcaster.new(broadcaster_params.merge(:broadcast_key => Broadcaster.new_key, :user_id => current_user.id))
    @broadcaster.save!
  end

  def update
    broadcaster = Broadcaster.find(params[:id])
    if broadcaster
      if broadcaster.update_attributes(update_params)
        flash[:success] = "Broadcast updated"
      end
    end
  end

  def new
    @broadcaster = Broadcaster.new
  end

  def setup
  end

  def show
  end

  def broadcaster_params
    params.require(:broadcaster).permit(:broadcast_cover)
  end

  def increment
    broadcaster_id = params[:id]
    @broadcaster = Broadcaster.find(broadcaster_id)
    @broadcaster.increment!(:num_listeners)
  end

  def decrement
    broadcaster_id = params[:id]
    @broadcaster = Broadcaster.find(broadcaster_id)
    @broadcaster.decrement!(:num_listeners)
  end

  def update_params
    params.permit(:id, :is_playing)

  end
end
