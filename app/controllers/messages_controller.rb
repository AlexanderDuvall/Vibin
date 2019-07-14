class MessagesController < ApplicationController
  before_action :find_conversation!

  def new
    @message = current_user.messages.build
  end

  def create
    @conversation ||= Conversation.create(sender_id: current_user.id, receiver_id: @receiver.id)
    @message = current_user.messages.new(message_params)
    @message.conversation_id = @conversation.id
    puts @message
    respond_to do |format|
      if @message.save!
        format.js
        format.html {redirect_to @message, notice: 'message was successfully created.'}
        format.json {render :show, status: :created, location: @message}
      else
        format.html {render :new}
        format.json {render json: @message.errors, status: :unprocessable_entity}
      end
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end

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
end
