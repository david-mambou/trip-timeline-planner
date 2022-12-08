class AddTransfersToStop < ActiveRecord::Migration[7.0]
  def change
    add_reference :stops, :inbound, foreign_key: { to_table: :transfers }
    add_reference :stops, :outbound, foreign_key: { to_table: :transfers }
  end
end
