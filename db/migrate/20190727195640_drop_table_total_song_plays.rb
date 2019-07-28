class DropTableTotalSongPlays < ActiveRecord::Migration[5.2]
  def change
    drop_table :total_song_plays
  end
end
