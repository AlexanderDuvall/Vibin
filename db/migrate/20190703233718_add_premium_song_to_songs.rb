class AddPremiumSongToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :premium, :boolean, default: false
  end
end
