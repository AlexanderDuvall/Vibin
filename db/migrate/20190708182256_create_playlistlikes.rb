class CreatePlaylistlikes < ActiveRecord::Migration[5.2]
  def change
    create_table :playlistlikes do |t|
      t.references :playlist, type: :int, index: true, foreign_key: true
      t.references :user, type: :int, index: true, foreign_key: true
    end
  end
end
