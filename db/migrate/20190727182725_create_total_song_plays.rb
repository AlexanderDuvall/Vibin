class CreateTotalSongPlays < ActiveRecord::Migration[5.2]
  def change
    create_table :total_song_plays do |t|
      t.integer :count
      t.references :song, foreign_key: true, type: :integer
      t.timestamps
    end
  end
end
