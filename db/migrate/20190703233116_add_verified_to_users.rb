class AddVerifiedToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :Verified, :boolean, default: false
  end
end
