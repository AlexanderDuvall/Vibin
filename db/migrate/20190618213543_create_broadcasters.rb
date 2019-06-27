class CreateBroadcasters < ActiveRecord::Migration[5.2]
  def change
    create_table :broadcasters do |t|
      t.references :user, foreign_key: true
      t.string :broadcast_key

      t.timestamps
    end
  end
end
