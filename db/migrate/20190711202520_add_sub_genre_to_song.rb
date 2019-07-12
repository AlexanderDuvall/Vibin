class AddSubGenreToSong < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :subGenre, :string, null: false
  end
end
