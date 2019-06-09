class RemoveReferenceSongsFromPosts < ActiveRecord::Migration[5.2]
  def change
    remove_reference :posts, :song;
    add_reference :songs, :post, index: true ;
  end
end
