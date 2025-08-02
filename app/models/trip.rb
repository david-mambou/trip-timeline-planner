class Trip < ApplicationRecord
  has_many :stops, dependent: :destroy
end
