class AddDefaultValueToDefaultColumnInPlaylists < ActiveRecord::Migration[5.2]
  def change
    change_column :playlists, :default, :boolean, default: false
  end
end
