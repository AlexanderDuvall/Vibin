class CreateTableAlbumlikes < ActiveRecord::Migration[5.0]
  def change
    create_table :albumlikes do |t|
      t.string :list
      t.belongs_to :users

    end
  end
end
