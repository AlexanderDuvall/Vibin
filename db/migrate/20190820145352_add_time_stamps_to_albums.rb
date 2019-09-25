class AddTimeStampsToAlbums < ActiveRecord::Migration[5.2]
  def change
    add_timestamps :albums
  end
end
