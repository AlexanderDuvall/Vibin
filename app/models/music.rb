class Music < ApplicationRecord
  validates :title, presence: true, length: {maximum: 40};
  validates :text, length: {maximum: 100};
  validates :genre, presence: true;
  validates :user_id, presence: true;
  has_one_attached :song_file
  validates :song_file, presnece: true, file_content_type: {allow: ['audio/mp4', 'audio/mp3']};


end
