class MusicController < ApplicationController
  before_action :logged_in?, only: [:create, :destroy]
  before_action :correct_user, only:[ :create, :destroy]

  def create
    @music = Music.new(music_params)
    if (@music.save)
      redirect_to root_url
    else
      puts "UNABLE TO UPLOAD THIS!"
    end
  end

  def edit
  end

  def new
    @music = Music.new
  end

  def destroy
  end

  def music_params
    params.require(:music).permit(:title, :text, :genre,
                                  :user_id => current_user.id)
  end
end
