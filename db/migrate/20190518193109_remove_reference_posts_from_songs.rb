class RemoveReferencePostsFromSongs < ActiveRecord::Migration[5.2]
  def change
    remove_reference :songs, :post
  end
end
