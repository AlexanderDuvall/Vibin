class ChangeColumnPlaysToDefaultSongs < ActiveRecord::Migration[5.2]
  def change
    change_column :songs, :plays, :integer, default: 0;
  end
end
