'use strict'

var $ = require('jquery')
var jQuery = require('jquery')

window.$ = $
window.jQuery = jQuery

$(document).ready(function () {
  const GREEN = '.green'
  const BLUE = '.blue'
  const YELLOW = '.yellow'
  const RED = '.red'

  let intervalID = null
  let currentColorIndex = 0
  const sequence = [
    GREEN,
    GREEN,
    YELLOW,
    BLUE,
    YELLOW
  ]

  let flicker = function () {
    $(sequence[currentColorIndex]).addClass('highlighted')
    setTimeout(function () {
      $(sequence[currentColorIndex]).removeClass('highlighted')
      if (currentColorIndex === sequence.length - 1) {
        currentColorIndex = 0
        clearInterval(intervalID)
        return
      }
      currentColorIndex++
    }, 500)
  }

 $('#start').on('click', function() {
   intervalID = setInterval(
     () => flicker()
   , 1000)
 })
})
