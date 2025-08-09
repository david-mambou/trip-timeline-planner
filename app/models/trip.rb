class Trip < ApplicationRecord
  belongs_to :user
  has_many :stops, dependent: :destroy
end
