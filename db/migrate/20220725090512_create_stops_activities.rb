class CreateStopsActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :stops_activities do |t|
      t.belongs_to :activity
      t.belongs_to :stop

      t.timestamps
    end
  end
end
