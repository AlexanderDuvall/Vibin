class ChangeUserArtistPlayCounter < ActiveRecord::Migration[5.2]
  def change
    rename_table :user_artist_play_counters, :user_artist_play_counter if table_exists? :user_artist_play_counters
    remove_column :user_artist_play_counters, :updated_at if column_exists? :user_artist_play_counters, :updated_at
    remove_column :user_artist_play_counters, :created_at if column_exists? :user_artist_play_counters, :created_at
  end
end
