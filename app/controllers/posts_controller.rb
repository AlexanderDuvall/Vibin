class PostsController < ApplicationController
  before_action :logged_in?, only: [:create, :destroy]
  before_action :correct_user, only: :destroy
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def new
    @post = Post.new
  end

  def index

  end

  def userfeed
    if logged_in?
      # array with current_user id
      @getUsers = [current_user]
      # array of following row ids the current user is in
      @followingRows = Relationship.all.where("follower_id = ?", current_user)
      @followingRows.each do |a|
        #append following user's id
        @getUsers.push(a.followed_id)
      end
      @userpost = Post.all.where("user_id IN (?)", @getUsers)
      @usersongpost = Song.all.where("user_id IN (?) ", @getUsers)
      puts "IN BROADCASTERS #{@broadcasters}"
      @posts = @userpost
      @combine = (@usersongpost + @posts).sort_by { |post| post.created_at }.reverse.paginate(page: params[:page], per_page: 10)
      respond_to do |format|
        format.js
      end
    end
  end

  def create
    @post = current_user.posts.new(post_params)
    puts " this is whats up rn#{post_params }"
    respond_to do |format|
    if @post.save!
      format.html { redirect_to root_url, notice: 'Post was successfully created.' }
      format.json { render :show, status: :created, location: @post }

    else
      puts "failure post"
      #format.html { render :new }
      #format.json { render json: @post.errors, status: :unprocessable_entity }
    end
    end
  end

  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: 'Tweet was successfully updated.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def repost
    @post = current_user.posts.new(repost_params)
    respond_to do |format|
      if @post.save!
        format.js
        format.html { redirect_to @post, notice: 'Post was successfully created.' }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @post.destroy
    respond_to do |format|
      flash[:success] = "Post deleted"
      format.js
      format.html
    end
  end

  def show
    @user = User.find(@post.user_id)
    @post = Post.find(params[:id])

  end


  private

  def post_params
    params.permit(:user_id, :content, :post_id, {images: []})
  end

  def repost_params
    params.permit(:user_id, :post_id)
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def correct_user
    @post = current_user.posts.find_by(id: params[:id])
    redirect_to root_url if @post.nil?
  end

end
