class AddlocationtoUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :country, :string, null: false
    add_column :users, :longitude, :string, null: false
    add_column :users, :latitude, :string, null: false
    add_column :users, :badgeColor, :string, default: "#8ff478"
    add_column :users, :badgeTextColor, :string, default: "#ffffff"

  end
end
