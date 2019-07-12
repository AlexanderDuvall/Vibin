class ChangesMessagesTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :messages, :receiver_id, :conversation_id if column_exists? :messages, :receiver_id#to rename column
    rename_table :message, :conversations if table_exists? :message
    add_column :conversations, :sender_id, :integer, index: true
    add_column :conversations, :receiver_id, :integer, index: true
    add_index :conversations, [:sender_id, :receiver_id], unique: true
  end
end
