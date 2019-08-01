class AddDefaultToColumnIsPlaying < ActiveRecord::Migration[5.2]
  def change
    change_column :broadcasters, :is_playing, :boolean, default: false
  end
end
