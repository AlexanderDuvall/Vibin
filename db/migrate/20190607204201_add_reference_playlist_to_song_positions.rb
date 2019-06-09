class AddReferencePlaylistToSongPositions < ActiveRecord::Migration[5.2]
  def change
    change_column :songs, :id, :bigint
    add_reference :song_positions, :playlist, foreign_key: true
  end
end
