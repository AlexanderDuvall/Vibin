class ChangeUsersTable < ActiveRecord::Migration[5.2]
  def up
    #STRIP ALL FOREIGN KEYS
    remove_reference :albums, :user if column_exists?(:albums, :user_id)
    remove_reference :albumlikes, :users if column_exists?(:albumlikes, :users_id)
    remove_reference :favorites, :users if column_exists?(:favorites, :users_id)
    remove_reference :songs, :user if column_exists?(:songs, :user_id)
    remove_reference :songs, :users if column_exists?(:songs, :users_id)
    remove_reference :posts, :user if column_exists?(:posts, :user_id)
    remove_reference :likes, :user if column_exists?(:likes, :user_id)
    remove_reference :playlists, :user if column_exists?(:playlists, :user_id)
    remove_reference :messages, :user if column_exists?(:messages, :user_id)
    remove_reference :user_song_play_counters, :user if column_exists?(:user_song_play_counters, :user_id)
    remove_reference :user_artist_play_counters, :user if column_exists?(:user_artist_play_counters, :user_id)
    remove_reference :broadcasters, :user if column_exists?(:broadcasters, :user_id)


    change_column :users, :zipcode, :mediumint if column_exists? :users, :zipcode
    change_column :users, :id, :int, auto_increment: true
    add_column :users, :city, :string if !column_exists?(:users, :city)
    add_column :users, :state, :string if !column_exists?(:users, :state)

    #ADD FOREIGN KEYS AGAIN
    add_reference :albums, :user, type: :int, foreign_key: true if !column_exists?(:albums, :user_id)
    add_reference :albumlikes, :users, type: :int, foreign_key: true if !column_exists?(:albumlikes, :user_id)
    add_reference :favorites, :users, type: :int, foreign_key: true if !column_exists?(:favorites, :user_id)
    add_reference :songs, :user, type: :int, foreign_key: true if !column_exists?(:songs, :user_id)
    add_reference :posts, :user, type: :int, foreign_key: true if !column_exists?(:posts, :uses_id)
    add_reference :likes, :user, type: :int, foreign_key: true if !column_exists?(:likes, :user_id)
    add_reference :playlists, :user, type: :int, foreign_key: true if !column_exists?(:playlists, :user_id)
    add_reference :messages, :user, type: :int, foreign_key: true if !column_exists?(:messages, :user_id)
    add_reference :user_song_play_counters, :user, type: :int, foreign_key: true if !column_exists?(:user_song_play_counters, :user_id)
    add_reference :user_artist_play_counters, :user, type: :int, foreign_key: true if !column_exists?(:user_artist_play_counters, :user_id)
    add_reference :broadcasters, :user, type: :int, foreign_key: true if !column_exists?(:broadcasters, :user_id)
  end
end
