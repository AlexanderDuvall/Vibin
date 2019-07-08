class AddReferenceAlbumToTableSongs < ActiveRecord::Migration[5.2]
  def self.up
    remove_reference :songs, :album if column_exists? :songs, :album_id
    change_column :albums, :id, :bigint, auto_increment: true
    add_reference :songs, :album, foreign_key: true
  end

  def self.down
    remove_reference :songs, :album
    change_column :albums, :id, :int
  end
end
