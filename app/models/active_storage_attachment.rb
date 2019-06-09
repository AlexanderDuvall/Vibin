class Active_storage_attachment < ApplicationRecord
    validates :record_id, presence: true
end
