class Stop < ApplicationRecord
  has_and_belongs_to_many :transfers
  has_and_belongs_to_many :activities, join_table: :stops_activities
  belongs_to :stay
  belongs_to :trip
  # belongs_to :transfer
end
