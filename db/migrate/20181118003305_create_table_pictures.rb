class CreateTablePictures < ActiveRecord::Migration[5.0]
  def change
    create_table :pictures do |t|

      t.blob :image
      t.belongs_to :users
        t.belongs_to :posts
    end
  end
end
