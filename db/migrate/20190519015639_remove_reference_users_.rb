class RemoveReferenceUsers < ActiveRecord::Migration[5.2]
  def change
    remove_reference :albums, :users if column_exists?(:albums, :users)
  end
end
