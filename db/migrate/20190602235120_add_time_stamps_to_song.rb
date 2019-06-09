class AddTimeStampsToSong < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :created_at, :datetime
    add_column :songs, :updated_at, :datetime
  end
end
