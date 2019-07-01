class AddRecieverToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :reciever, :integer
  end
end
