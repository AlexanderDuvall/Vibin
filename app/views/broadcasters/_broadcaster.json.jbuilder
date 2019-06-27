json.extract! broadcaster, :id, :user_id, :broadcast_key, :created_at, :updated_at
json.url broadcaster_url(broadcaster, format: :json)
