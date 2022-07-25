class CreateStopsTransfers < ActiveRecord::Migration[7.0]
  def change
    create_table :stops_transfers do |t|
      t.belongs_to :stop
      t.belongs_to :transfer

      t.timestamps
    end
  end
end
