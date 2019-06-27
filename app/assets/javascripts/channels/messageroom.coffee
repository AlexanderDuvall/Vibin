App.room = App.cable.subscriptions.create "MessageroomChannel",
  connected: ->

  disconnected: ->

  received: (data)->
    $messages = $("#messages")
    $messages.append data
    $messages.scrollTop $messages.prop('scrollHeight')

  speak: (message) ->
    @perform 'speak', message: message
