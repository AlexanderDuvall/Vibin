class CreateTableSongPositions < ActiveRecord::Migration[5.2]
  def change
    create_table :song_positions do |t|
    t.integer :position
    end
  end

end
