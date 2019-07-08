class ChangePlaylists < ActiveRecord::Migration[5.2]
  def change
    remove_reference :song_positions, :playlist if column_exists? :song_positions, :playlist_id
    remove_reference :songs, :playlist if column_exists? :songs, :playlist_id
    change_column :playlists, :id, :int, auto_increment: true
    add_reference :song_positions, :playlist, type: :int, index: true, foreign_key: true
    add_reference :songs, :playlist, type: :int, index: true, foreign_key: true
  end
end
