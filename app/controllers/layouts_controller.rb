class LayoutsController < ApplicationController
  def nav
        @user = User.find(params[:id])
  end

  private
    def user_params
      params.require(:users).permit(:id, :full_name, :email)
    end
    def logged_in_user
      unless logged_in?
        store_location
        flash[:danger] = "Please log in"
        redirect_to login_url
      end
    end
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless current_user?(@user)
  end
end
