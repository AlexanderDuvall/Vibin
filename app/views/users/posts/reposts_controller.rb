class Posts::RepostsController < ApplicationController
before_action :logged_in?

def new
  @OGpost = Post.find(params[:post_id])
  puts "__________"
  puts @OGpost.id
  puts "__________"
  @repost = Post.new
end

 def create
   @repost = current_user.posts.new(post_id: @OGpost.id)
   respond_to do |format|
     if @repost.save!
       format.js
       format.html {redirect_to @repost, notice: 'Repost was successfully created.'}
       format.json {render :show, status: :created, location: @repost}
     else
       format.html {render :new}
       format.json {render json: @repost.errors, status: :unprocessable_entity}
     end
   end
 end

 def destroy

 end

 private

      def repost_params
        params.require(:repost).permit(:user_id, :content, :post_id)
      end
end
