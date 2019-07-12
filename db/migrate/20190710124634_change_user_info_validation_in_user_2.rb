class ChangeUserInfoValidationInUser2 < ActiveRecord::Migration[5.2]
  def change
        change_column :users, :zipcode, :mediumint, limit: 5
  end
end
