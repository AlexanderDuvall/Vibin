class AddSongPathToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :song_path, :string
  end
end
