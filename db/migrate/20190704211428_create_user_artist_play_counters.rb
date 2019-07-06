class CreateUserArtistPlayCounters < ActiveRecord::Migration[5.2]
  def change
    create_table :user_artist_play_counters do |t|
      t.integer :user_id, index: true
      t.integer :artist_id, index: true
      t.integer :plays
      t.timestamps
    end
  end
end
