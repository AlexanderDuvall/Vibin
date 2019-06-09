class AddReferencesToSongPositions < ActiveRecord::Migration[5.2]
  def reversible
    change_column :songs, :id, :bigint
  end

end
