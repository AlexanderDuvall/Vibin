class ChangeUseRSongPlayCounter < ActiveRecord::Migration[5.2]
  def change
    remove_reference :user_song_play_counters, :song if column_exists? :user_song_play_counters, :song_id
    remove_reference :user_song_play_counters, :user if column_exists? :user_song_play_counters, :user_id
    add_reference :user_song_play_counters, :song, type: :int, foreign_key: true, index: true if !column_exists? :user_song_play_counters, :song_id
    add_reference :user_song_play_counters, :user, type: :int, foreign_key: true, index: true if !column_exists? :user_song_play_counters, :user_id
  end
end
3200
