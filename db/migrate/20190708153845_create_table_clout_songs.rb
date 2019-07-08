class CreateTableCloutSongs < ActiveRecord::Migration[5.2]
  def change
    create_table :clout_songs do |t|
      t.integer :remaining_days
      t.integer :payment
      t.timestamps
      t.references :song, index: true, type: :int, foreign_key: true
     end
  end
end
