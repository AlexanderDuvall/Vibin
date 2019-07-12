module ApplicationCable
  class Connection < ActionCable::Connection::Base
  #  include SessionsHelper

    identified_by :current_user

    def connect
      self.current_user = find_verified_user
        puts "id:   #{current_user.id}"
    end

    private

    def find_verified_user
      puts "in find_verified_user"
      if current_user = User.find_by(id: 97)
          current_user
        else
          reject_unauthorized_connection
        end
      #if !logged_in?
      #  puts "logged in is true"
      #  current_user
      #  puts " "
      #  puts current_user
    #  else
    #    puts "else statement"
    #    reject_unauthorized_connection
    #  end

    end
  end
end
