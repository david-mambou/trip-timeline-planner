class Stay < ApplicationRecord
  belongs_to :user
  has_many :stops
end
