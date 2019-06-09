class PasswordResetsController < ApplicationController

  def create
    @user = User.find_by_email(params[:email].downcase)
    @user.send_password_reset if @user
      flash[:info] = "Email sent with password reset instructions"
      redirect_to root_url
  end

  def edit
    @user = User.find_by_reset_digest!(params[:id])
  end

  def update
    @user = User.find_by_reset_digest!(params[:id])
    if @user.reset_sent_at < 2.hours.ago
      redirect_to new_password_reset_url, :alert => "Password reset expired"
    elsif @user.update_attributes(user_params)
      redirect_to root_url, :notice => "password has been reset"
    else
      render :edit
    end
  end

  def new
  end
end
private
 def user_params
   params.require(:user).permit(:password, :password_confirmation)
 end
