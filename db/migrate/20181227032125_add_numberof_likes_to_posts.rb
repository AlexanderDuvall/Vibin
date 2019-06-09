class AddNumberofLikesToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :NumberofLikes, :integer
  end
end
