class CreateUserSongPlayCounters < ActiveRecord::Migration[5.2]
  def change
    create_table :user_song_play_counters do |t|
      t.integer :user_id
      t.integer :song_id
      t.integer :plays

      t.timestamps
    end
  end
end
