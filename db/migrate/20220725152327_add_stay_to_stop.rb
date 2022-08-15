class AddStayToStop < ActiveRecord::Migration[7.0]
  def change
    add_reference :stops, :stay, foreign_key: true
  end
end
