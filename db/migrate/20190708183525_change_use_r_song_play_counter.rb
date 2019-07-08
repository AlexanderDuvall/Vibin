class ChangeUseRSongPlayCounter < ActiveRecord::Migration[5.2]
  def change
    remove_reference :user_song_play_counter, :song if column_exists? :user_song_play_counter, :song_id
    remove_reference :user_song_play_counter, :user if column_exists? :user_song_play_counter, :user_id
    add_reference :user_song_play_counter, :song, type: :int, foreign_key: true, index: true if !column_exists? :user_song_play_counter, :song_id
    add_reference :user_song_play_counter, :user, type: :int, foreign_key: true, index: true if !column_exists? :user_song_play_counter, :user_id
  end
end
3200
