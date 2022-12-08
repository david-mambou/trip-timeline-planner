class Stop < ApplicationRecord
  belongs_to :inbound, class_name: 'Transfer', foreign_key: 'inbound_id', optional: true
  belongs_to :outbound, class_name: 'Transfer', foreign_key: 'outbound_id', optional: true

  has_and_belongs_to_many :activities, join_table: :stops_activities
  belongs_to :stay
  belongs_to :trip
end
