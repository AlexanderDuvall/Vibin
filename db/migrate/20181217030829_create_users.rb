class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|

      t.string :email
      t.string :username, limit: 20
      t.string :password
      t.string :name, limit: 30
      t.integer :zipcode, limit: 5
      t.boolean :public, default: true
      t.string :gender
      t.string :bio, limit: 150
      t.date :birthday
      t.timestamps
    end
  end
end
