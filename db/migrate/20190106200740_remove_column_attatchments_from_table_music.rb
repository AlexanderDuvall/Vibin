class RemoveColumnAttatchmentsFromTableMusic < ActiveRecord::Migration[5.2]
  def change
    remove_column :music, :attachment, :blob
  end
end
