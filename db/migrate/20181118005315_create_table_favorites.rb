class CreateTableFavorites < ActiveRecord::Migration[5.0]
  def change
    create_table :favorites do |t|
      t.integer :musicid
      t.integer :count
      t.integer :artistid
      t.string :genre
      t.belongs_to :users

    end
  end
end
