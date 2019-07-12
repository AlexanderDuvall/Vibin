class Comment < ApplicationRecord
  attr_accessor :comment, :content, :user, :post
  belongs_to :user
  belongs_to :post
end
