class RemoveAlbumLikes < ActiveRecord::Migration[5.2]
  def change
    drop_table :albumlikes
  end
end
