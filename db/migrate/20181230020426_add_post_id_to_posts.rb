class AddPostIdToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :post_id, :integer
  end
end
