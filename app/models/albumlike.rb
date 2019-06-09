class Albumlike < ApplicationRecord
  attr_accessor :list
  belongs_to :user
end
