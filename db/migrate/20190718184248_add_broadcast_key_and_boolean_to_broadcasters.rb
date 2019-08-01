class AddBroadcastKeyAndBooleanToBroadcasters < ActiveRecord::Migration[5.2]
  def change
    add_column :broadcasters, :broadcast_key, :string
    add_column :broadcasters, :is_playing, :boolean
  end
end
