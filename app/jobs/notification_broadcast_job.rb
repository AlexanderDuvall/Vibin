class NotificationBroadcastJob < ApplicationJob
    queue_as :default

    def perform(message)
      mess = render_message(message)

      #ActionCable.server.broadcast "notifications_#{message.conversation.receiver.id}_channel user_id",
      #                             message: mess,
      #                             conversation_id: message.conversation.id

      ActionCable.server.broadcast "notifications_#{message.conversation.receiver.id}_channel",
                             notification: render_notification(message),
                             message: mess,
                             conversation_id: message.conversation.id
    end

    private

    def render_notification(message)
      NotificationsController.render partial: 'notifications/notification', locals: {message: message}
    end

    def render_message(message)
      MessagesController.render partial: 'messages/message',
                                        locals: {message: message}
    end
  end
