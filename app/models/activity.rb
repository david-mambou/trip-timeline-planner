class Activity < ApplicationRecord
  has_and_belongs_to_many :stops, join_table: :stops_activities
end
