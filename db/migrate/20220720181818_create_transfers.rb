class CreateTransfers < ActiveRecord::Migration[7.0]
  def change
    create_table :transfers do |t|
      t.string :mode
      t.datetime :departure_time
      t.datetime :arrival_time
      t.string :pickup_point
      t.float :price

      t.timestamps
    end
  end
end
