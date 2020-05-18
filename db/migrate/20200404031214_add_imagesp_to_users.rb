class AddImagespToUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :imagesproperties, :string
    add_column :users, :imagespp, :string
  end
end
