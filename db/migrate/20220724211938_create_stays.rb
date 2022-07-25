class CreateStays < ActiveRecord::Migration[7.0]
  def change
    create_table :stays do |t|
      t.string :name
      t.float :price
      t.belongs_to :stop, null: false, foreign_key: true

      t.timestamps
    end
  end
end
