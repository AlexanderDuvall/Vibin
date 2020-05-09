class ChangeImagesPropertiesName < ActiveRecord::Migration[6.0]
  def change
    rename_column :users, :imagesProperties, :imagesproperties
  end
end
