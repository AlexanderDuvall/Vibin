class AddDefaultToCounterColumnTotalSongPlays < ActiveRecord::Migration[5.2]
  def change
    change_column :total_song_plays, :count, :integer, default: 0
  end
end
