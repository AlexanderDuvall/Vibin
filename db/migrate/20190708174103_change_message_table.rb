class ChangeMessageTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :messages, "reciever", "receiver_id" if column_exists? :messages, :reciever
    change_column :messages, :id, :int, auto_increment: true
    add_index :messages, :receiver_id
  end
end
