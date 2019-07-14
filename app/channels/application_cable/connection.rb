module ApplicationCable
  class Connection < ActionCable::Connection::Base

    identified_by :current_user


    def connect
      self.current_user = find_verified_user
    end

    protected
     def find_verified_user
       puts "1111111"
       puts cookies[:current_user_id]
       puts "1111111"
       if verified_user = User.find_by(id: cookies[:current_user_id])
      # if verified_user = User.find_by(id: 2)
          verified_user
        else
          reject_unauthorized_connection
        end
    end
  end
end
