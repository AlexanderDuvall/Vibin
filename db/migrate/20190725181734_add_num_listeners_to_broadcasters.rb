class AddNumListenersToBroadcasters < ActiveRecord::Migration[5.2]
  def change
    add_column :broadcasters, :num_listeners, :integer unless column_exists? :broadcasters, :num_listeners
  end
end
