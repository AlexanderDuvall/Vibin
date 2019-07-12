class ChangeUserInfoValidationInUser3 < ActiveRecord::Migration[5.2]
  def change
      change_column :users, :zipcode, :integer
  end
end
