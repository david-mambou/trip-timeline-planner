class AddStayToStop < ActiveRecord::Migration[7.0]
  def change
    add_reference :stops, :stays, foreign_key: true
  end
end
