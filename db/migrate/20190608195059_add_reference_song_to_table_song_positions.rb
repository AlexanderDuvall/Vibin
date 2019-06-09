class AddReferenceSongToTableSongPositions < ActiveRecord::Migration[5.2]
  def change
    add_reference :song_positions, :song, foreign_key: true unless column_exists?(:song_positions, :song_id)
  end
end
