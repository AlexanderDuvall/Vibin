class AddUserToSongs < ActiveRecord::Migration[5.2]
  def change
    add_reference :songs, :post, foreign_key: true
  end
end
