class AddCountToSongLikes < ActiveRecord::Migration[6.0]
  def add
    add_column :songlikes, :count, :bigint
  end
end
