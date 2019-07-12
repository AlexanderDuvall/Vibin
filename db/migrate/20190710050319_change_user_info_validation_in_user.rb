class ChangeUserInfoValidationInUser < ActiveRecord::Migration[5.2]
  def change
      change_column :users, :name, :string, limit: 40
      change_column :users, :username, :string, limit: 30
  end
end
