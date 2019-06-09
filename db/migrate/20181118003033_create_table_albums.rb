class CreateTableAlbums < ActiveRecord::Migration[5.0]
  def change
    create_table :albums do |t|
      t.string :musiclist
      t.string :title
      t.string :message
      t.belongs_to :users

    end
  end
end
