class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      if user.activated?
        log_in user
        cookies[:current_user_id] = user.id
        params[:session][:remember_me] == '1' ? remember(user) : forget(user)
        redirect_to root_url
      else
         message  = "Account not activated. "
        message += "Check your email for the activation link."
        flash[:warning] = message
        render 'user_mailer/account_activation'
      end
    else
      flash.now[:danger] = 'Invalid email/password combination'
      render 'new'
    end
end
  def destroy
    log_out if logged_in?
    redirect_to root_url
  end
end
