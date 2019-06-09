class Picture < ApplicationRecord
  attr_accessor :image
  belongs_to :user
  belongs_to :post
end
