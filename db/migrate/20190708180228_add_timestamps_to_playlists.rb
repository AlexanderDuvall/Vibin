class AddTimestampsToPlaylists < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :created_at, :datetime, null: false
    add_column :playlists, :updated_at, :datetime, null: false
  end
end
