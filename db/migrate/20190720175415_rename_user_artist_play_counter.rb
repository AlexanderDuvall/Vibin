class RenameUserArtistPlayCounter < ActiveRecord::Migration[5.2]
  def change
    rename_table :user_artist_play_counter, :user_artist_play_counters
  end
end
