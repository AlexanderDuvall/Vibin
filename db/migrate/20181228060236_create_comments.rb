class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.references :user
      t.text :comment
      t.integer :NumberofLikes
      t.references :post

      t.timestamps
    end
    add_index :comments, [:post_id, :user_id]
  end
end
