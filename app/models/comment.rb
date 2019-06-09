class Comment < ApplicationRecord
  attr_accessor :comment, :context, :user, :post
  belongs_to :user
  belongs_to :post
end
