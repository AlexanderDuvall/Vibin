# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_12_002219) do

  create_table "active_storage_attachments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "albums", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "musiclist"
    t.string "title"
    t.string "message"
    t.integer "users_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_albums_on_user_id"
    t.index ["users_id"], name: "index_albums_on_users_id"
  end

  create_table "broadcasters", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "num_listeners"
    t.integer "user_id"
    t.string "broadcast_key"
    t.boolean "is_playing", default: false
    t.index ["user_id"], name: "index_broadcasters_on_user_id"
  end

  create_table "clout_songs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "remaining_days"
    t.integer "payment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "song_id"
    t.index ["song_id"], name: "index_clout_songs_on_song_id"
  end

  create_table "comments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "user_id"
    t.text "comment"
    t.integer "NumberofLikes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "post_id"
    t.index ["post_id"], name: "index_comments_on_post_id"
    t.index ["user_id"], name: "index_comments_on_post_id_and_user_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "conversations", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "sender_id"
    t.integer "receiver_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sender_id", "receiver_id"], name: "index_conversations_on_sender_id_and_receiver_id", unique: true
  end

  create_table "favorites", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "musicid"
    t.integer "count"
    t.integer "artistid"
    t.string "genre"
    t.integer "users_id"
    t.index ["users_id"], name: "index_favorites_on_users_id"
  end

  create_table "likes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.integer "post_id"
    t.index ["post_id"], name: "index_likes_on_post_id"
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "messages", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "conversation_id"
    t.integer "user_id"
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "playlistlikes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "playlist_id"
    t.integer "user_id"
    t.index ["playlist_id"], name: "index_playlistlikes_on_playlist_id"
    t.index ["user_id"], name: "index_playlistlikes_on_user_id"
  end

  create_table "playlists", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "default", default: false
    t.index ["user_id"], name: "index_playlists_on_user_id"
  end

  create_table "posts", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.integer "post_id"
    t.index ["post_id"], name: "index_posts_on_post_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "relationships", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "follower_id"
    t.integer "followed_id"
    t.boolean "blocked"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["followed_id"], name: "index_relationships_on_followed_id"
    t.index ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true
    t.index ["follower_id"], name: "index_relationships_on_follower_id"
  end

  create_table "song_positions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "position"
    t.integer "playlist_id"
    t.integer "song_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["playlist_id"], name: "index_song_positions_on_playlist_id"
    t.index ["song_id"], name: "index_song_positions_on_song_id"
  end

  create_table "songlikes", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "user_id"
    t.integer "song_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["song_id"], name: "index_songlikes_on_song_id"
    t.index ["user_id"], name: "index_songlikes_on_user_id"
  end

  create_table "songs", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title"
    t.string "text"
    t.string "genre"
    t.integer "albums_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "plays", default: 0
    t.boolean "premium", default: false
    t.bigint "album_id"
    t.integer "user_id"
    t.integer "playlist_id"
    t.string "subGenre"
    t.index ["album_id"], name: "index_songs_on_album_id"
    t.index ["playlist_id"], name: "index_songs_on_playlist_id"
    t.index ["user_id"], name: "index_songs_on_user_id"
  end

  create_table "user_artist_play_counters", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "artist_id"
    t.integer "plays"
    t.integer "user_id"
    t.index ["artist_id"], name: "index_user_artist_play_counters_on_artist_id"
    t.index ["user_id"], name: "index_user_artist_play_counters_on_user_id"
  end

  create_table "user_song_play_counters", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "plays"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "song_id"
    t.integer "user_id"
    t.index ["song_id"], name: "index_user_song_play_counters_on_song_id"
    t.index ["user_id"], name: "index_user_song_play_counters_on_user_id"
  end

  create_table "users", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email"
    t.string "username", limit: 30
    t.string "password_digest"
    t.string "name", limit: 40
    t.boolean "public", default: true
    t.string "gender"
    t.string "bio", limit: 150
    t.date "birthday"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "Terms_of_Agreement", default: true
    t.string "remember_digest"
    t.string "activation_digest"
    t.boolean "activated", default: false
    t.datetime "activated_at"
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.boolean "email_confirmed", default: false
    t.string "confirm_token"
    t.boolean "Verified", default: false
    t.string "longitude", null: false
    t.string "latitude", null: false
    t.string "badgeColor", default: "#8ff478"
    t.string "badgeTextColor", default: "#ffffff"
    t.string "hometown"
    t.string "location"
    t.string "imagespp"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "albums", "users"
  add_foreign_key "broadcasters", "users"
  add_foreign_key "clout_songs", "songs"
  add_foreign_key "favorites", "users", column: "users_id"
  add_foreign_key "likes", "users"
  add_foreign_key "messages", "users"
  add_foreign_key "playlistlikes", "playlists"
  add_foreign_key "playlistlikes", "users"
  add_foreign_key "playlists", "users"
  add_foreign_key "posts", "users"
  add_foreign_key "song_positions", "playlists"
  add_foreign_key "song_positions", "songs"
  add_foreign_key "songlikes", "songs"
  add_foreign_key "songs", "albums"
  add_foreign_key "songs", "playlists"
  add_foreign_key "songs", "users"
  add_foreign_key "user_artist_play_counters", "users"
  add_foreign_key "user_song_play_counters", "songs"
  add_foreign_key "user_song_play_counters", "users"
end
