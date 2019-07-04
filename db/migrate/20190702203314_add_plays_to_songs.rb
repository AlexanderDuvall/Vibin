class AddPlaysToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :plays, :integer
  end
end
