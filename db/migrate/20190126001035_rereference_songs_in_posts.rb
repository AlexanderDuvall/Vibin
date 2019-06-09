class RereferenceSongsInPosts < ActiveRecord::Migration[5.2]
  def change
    remove_column :posts, :songs_id
    add_reference :posts, :song, index: true;
  end
end
