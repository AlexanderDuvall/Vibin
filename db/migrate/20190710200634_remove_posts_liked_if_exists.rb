class RemovePostsLikedIfExists < ActiveRecord::Migration[5.2]
  def change
    drop_table :postsliked if table_exists? :postsliked
  end
end
