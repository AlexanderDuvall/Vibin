# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

#jQuery ->
#  $('#u').autocomplete(
#    source: "/users/autocomplete",
#    minLength: 4
#  )


window.onload = ->
  $ ->
    if $('.pagination').length and $('#feed').length
      $(".tab-content .tab-pane:first").scroll ->
        url = $('.pagination ul .next.next_page a').attr('href')
        if url and $(".tab-content .tab-pane:first").scrollTop() > $('#feed').height() - $(".tab-content .tab-pane:first").height() - 50
          console.log("next")
          $('.pagination').text('Loading more products...')
          return $.getScript(url)
        return
      return $(window).scroll()
    return
  return
