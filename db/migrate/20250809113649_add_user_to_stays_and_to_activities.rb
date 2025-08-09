class AddUserToStaysAndToActivities < ActiveRecord::Migration[8.0]
  def change
    add_reference :stays, :user, null: false, foreign_key: true
    add_reference :activities, :user, null: false, foreign_key: true
  end
end
