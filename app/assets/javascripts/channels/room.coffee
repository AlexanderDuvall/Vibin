###
App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->
    #called  when the subscription is ready for use on the server

  disconnected: ->
    #Called when the subscription has been terminated by the server

  received: (data) ->
    #Called when there's incoming data on the websocket for this channel
    unless data.message.blank?
      $('#messages-table').append data.message
      #scroll_bottom()

#$(document).on 'turbolinks:load', ->
#  submit_message()
#  scroll_bottom()

#submit_message = () ->
#  $('#message_content').on 'keydown', (event) ->
#    console.log(event.keyCode)
#    if event.keyCode == 13
#      console.log("keycode = 13")
#      $('input').click()
#      event.target.value = ""
#      event.preventDefault()

#scroll_bottom = () ->
#  console.log(";p;")
#  $('#messages').scrollTop($('#messages')[0].scrollHeight)
###
