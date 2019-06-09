class AddSongIdToMusicLikes < ActiveRecord::Migration[5.2]
  def change
    add_column :musiclikes, :song_id, :integer
    remove_column :musiclikes, :list
    remove_column :musiclikes, :users_id
    add_column :musiclikes, :user_id, :integer
  end
end
