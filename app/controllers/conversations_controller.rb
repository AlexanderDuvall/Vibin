class ConversationsController < ApplicationController
  before_action :set_conversation, except: [:index]
  before_action :check_participating!, except: [:index]

  def new
    @message = current_user.messages.build
    @conversation
  end

  def show
    @messages = Message.new
  end

  def index
  @conversations = Conversation.participating(current_user).order('updated_at DESC')
  respond_to do |format|
    format.html
    format.js
  end
  query = params[:term].presence || "*"
  @searchUsers = User.search(query)
  @user = User.find(current_user.id)
  @friends = Relationship.all.where("follower_id = ?", @user)
end

  private
  def find_conversation!
    if params[:receiver_id]
      @receiver = User.find_by(id: params[:receiver_id])
      redirect_to(root_path) and return unless @receiver
      @conversation = Conversation.between(current_user.id, @receiver.id)[0]
    else
      @conversation = Conversation.find_by(id: params[:conversation_id])
      redirect_to(root_path) and return unless @conversation && @conversation.participates?(current_user)
    end
  end

  def set_conversation
    @message = current_user.messages.build
    @conversation = Conversation.find_by(id: params[:id])
  end

  def check_participating!
   Conversation.create(sender_id: params[:sender_id], receiver_id: params[:receiver_id])  unless @conversation && @conversation.participates?(current_user)
  end
end
