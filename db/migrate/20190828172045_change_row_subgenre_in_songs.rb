class ChangeRowSubgenreInSongs < ActiveRecord::Migration[5.2]
  def change
    change_column :songs, :subGenre, :string, null: true
  end
end
