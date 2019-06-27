App.room = App.cable.subscriptions.create "MusicChannel",
  connected: ->
#called  when the subscription is ready for use on the server

  disconnected: ->
#Called when the subscription has been terminated by the server

  received: (data) ->
#Called when there's incoming data on the websocket for this channel
    $('#listener').append("<p>lmaoooooooooooo</p>")
