#
#jQuery(document).on 'turbolinks:load', ->
 #  messages = $('#conversation-body')
 #   if messages.length > 0
 #     messages_to_bottom()
###
  if $('#current-user').size() > 0
    App.personal_chat = App.cable.subscriptions.create {
      channel: "NotificationsChannel"
    },
    connected: ->
      # Called when the subscription is ready for use on the server

    disconnected: ->
      # Called when the subscription has been terminated by the server

    received: (data) ->
      console.log(data.message);
      console.log();
      if true
        console.log('lnadsfd');
        $('#conversation-body').append(data.message);
        messages_to_bottom()
      #else
      #  $.getScript('/conversations') if $('#conversations').size() > 0
      #  $('body').append(data['notification']) if data['notification']

    send_message: (message, conversation_id) ->
      @perform 'send_message', message: message, conversation_id: conversation_id

  $(document).on 'click', '#notification .close', ->
    $(this).parents('#notification').fadeOut(1000)
###
###
  if messages.length > 0
    messages_to_bottom()
    alert('lmao');
    $('#new_message').submit (e) ->
      $this = $(this)
      textarea = $this.find('#message_body')
      if $.trim(textarea.val()).length > 1
        App.personal_chat.send_message textarea.val(), $this.find('#conversation_id').val()
        textarea.val('')
      e.preventDefault()
      return false
###
