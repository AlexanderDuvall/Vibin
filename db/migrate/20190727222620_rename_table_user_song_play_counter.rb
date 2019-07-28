class RenameTableUserSongPlayCounter < ActiveRecord::Migration[5.2]
  def change
    rename_table :user_song_play_counter, :user_song_play_counters if table_exists? :user_song_play_counter
  end
end
