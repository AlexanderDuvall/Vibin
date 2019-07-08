class ChangeSongsTable < ActiveRecord::Migration[5.2]
  def up
    remove_reference :musiclikes, :song if column_exists?(:musiclikes, :song_id)
    remove_reference :songs, :post if column_exists?(:songs, :post_id)
    remove_reference :song_positions, :song if column_exists?(:song_positions, :song_id)
    remove_reference :song_positions, :songs if column_exists?(:song_positions, :songs_id)

    change_column :songs, :id, :int, auto_increment: true
    remove_column :songs, :song_path if column_exists? :songs, :song_path
    remove_index :songs, :albums_id if index_exists? :songs, :albums_id
    remove_index :songs, :post_id if index_exists? :songs, :post_id

    add_reference :song_positions, :song, type: :int, foreign_key: true if column_exists?(:song_positions, :song_id)
    add_reference :musiclikes, :song, type: :int, foreign_key: true if !column_exists?(:musiclikes, :song_id)

  end
end
