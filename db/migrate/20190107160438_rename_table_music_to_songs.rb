class RenameTableMusicToSongs < ActiveRecord::Migration[5.2]
  def change
    rename_table :music, :songs
  end
end
