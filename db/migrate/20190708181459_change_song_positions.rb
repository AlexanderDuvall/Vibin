class ChangeSongPositions < ActiveRecord::Migration[5.2]
  def change
    add_reference :song_positions, :song, type: :int, foreign_key: true, index: true if !column_exists? :song_positions, :song_id
    add_column :song_positions, :created_at, :datetime, null: false
    add_column :song_positions, :updated_at, :datetime, null: false
  end
end
