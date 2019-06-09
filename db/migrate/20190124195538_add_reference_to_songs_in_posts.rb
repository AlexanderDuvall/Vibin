class AddReferenceToSongsInPosts < ActiveRecord::Migration[5.2]
  def change
  add_reference :posts, :songs, index: true
  end
end
