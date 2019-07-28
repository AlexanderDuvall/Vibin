class RemoveBroadcasterKeyFromBroadcasters < ActiveRecord::Migration[5.2]
  def change
    remove_column :broadcasters, :broadcast_key
  end
end
