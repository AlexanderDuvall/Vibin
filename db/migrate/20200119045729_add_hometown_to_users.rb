class AddHometownToUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :city, :string
    remove_column :users, :state, :string
    remove_column :users, :country, :string
    remove_column :users, :zipcode, :string
    add_column :users, :hometown, :string
    add_column :users, :location, :string
    add_column :users, :imagesProperties, :string
  end
end
