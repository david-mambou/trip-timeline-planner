class ChangeInboundAndOutboundForeignKeysOnStop < ActiveRecord::Migration[8.0]
  def change
    remove_foreign_key :stops, column: :inbound_id
    remove_foreign_key :stops, column: :outbound_id
    add_foreign_key :stops, :transfers, column: :inbound_id, on_delete: :nullify
    add_foreign_key :stops, :transfers, column: :outbound_id, on_delete: :nullify
  end
end
