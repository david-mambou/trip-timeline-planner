class Stop < ApplicationRecord
  has_and_belongs_to_many :transfers
  has_and_belongs_to_many :activities
  belongs_to :stay
  belongs_to :trip
  # belongs_to :transfer
end
