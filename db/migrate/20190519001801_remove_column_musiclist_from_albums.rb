class RemoveColumnMusiclistFromAlbums < ActiveRecord::Migration[5.2]
  def change
    remove_column :albums, :musiclist
    remove_column :albums, :message
    remove_reference :albums, :users
    add_reference :albums, :user
  end
end
