class CreateStops < ActiveRecord::Migration[7.0]
  def change
    create_table :stops do |t|
      t.string :name
      t.references :trip, null: false, foreign_key: true
      t.date :start_day
      t.date :end_day

      t.timestamps
    end
  end
end
