class AddColumnDefaultToPlaylists < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :default, :boolean
  end
end
