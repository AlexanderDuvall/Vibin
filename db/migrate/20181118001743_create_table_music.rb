class CreateTableMusic < ActiveRecord::Migration[5.0]
  def change
    create_table :music do |t|
      t.blob :attachment
      t.string :title
      t.string :text
      t.string :genre
      t.belongs_to :albums
      t.belongs_to :users
     end
  end
end
