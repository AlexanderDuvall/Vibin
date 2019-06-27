module ApplicationCable
  class Connection < ActionCable::Connection::Base
    include SessionsHelper

    identified_by :current_user

    def connect
      puts ""
      puts ""
      puts "connect method"
      puts ""
      puts ""
      self.current_user = find_verified_user

    end

    private
    def find_verified_user
      puts "in find_verified_user"
      if !logged_in?
        puts "logged in is true"
        current_user
        puts " "
        puts current_user
      else
        puts "else statement"
        reject_unauthorized_connection
      end
    end
  end
end
