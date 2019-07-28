class AddNumListenersToBroadcasters < ActiveRecord::Migration[5.2]
  def change
    add_column :broadcasters, :num_listeners, :integer
  end
end
