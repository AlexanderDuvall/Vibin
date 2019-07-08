class ChangeMusicLikesToSongLikes < ActiveRecord::Migration[5.2]
  def change
    rename_table :musiclikes, :songlikes if table_exists? :musiclikes
    add_index :songlikes, :user_id if !index_exists? :songlikes, :user_id
    add_column :songlikes, :created_at, :datetime, null: false
    add_column :songlikes, :updated_at, :datetime, null: false
  end
end
