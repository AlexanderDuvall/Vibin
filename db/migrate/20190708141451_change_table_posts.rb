class ChangeTablePosts < ActiveRecord::Migration[5.2]
  def up
    # STRIP FKs
    remove_reference :posts, :post if column_exists?(:posts, :post_id)
    remove_reference :likes, :post if column_exists?(:likes, :post_id)
    remove_reference :comments, :post if column_exists?(:comments, :post_id)

    change_column :posts, :id, :int, auto_increment: true
    remove_index :posts, :created_at
    remove_column :posts, :NumberofLikes
    rename_column :posts, :context, :content

    # ADD FKs
    add_reference :posts, :post, type: :int if !column_exists?(:posts, :post_id)
    add_reference :likes, :post, type: :int if !column_exists?(:likes, :post_id)
    add_reference :comments, :post, type: :int if !column_exists?(:comments, :post_id)

  end
end
