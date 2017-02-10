'use strict'
var $ = require('jquery')
var jQuery = require('jquery')

window.$ = $
window.jQuery = jQuery

$(document).ready(function () {
  const PLAYER = 'player'
  const COMPUTER = 'computer'

  let turn = COMPUTER

  const GREEN = '.green'
  const BLUE = '.blue'
  const YELLOW = '.yellow'
  const RED = '.red'

  let intervalID = null
  let currentColorIndex = 0
  const sequence = [ GREEN, GREEN ]
  const userSequence = []

  let flicker = function () {
    $(sequence[currentColorIndex]).addClass('highlighted')
    setTimeout(
      function () {
        $(sequence[currentColorIndex]).removeClass('highlighted')
        if (currentColorIndex === sequence.length - 1) {
          currentColorIndex = 0
          clearInterval(intervalID)
          endTurn()
          return
        }
        currentColorIndex++
      },
      500
    )
  }

  $('#start').on('click', function () {
    intervalID = setInterval(() => flicker(), 1000)
  })

  const pressButton = color => {
    $(color).addClass('highlighted')
    setTimeout(
      function () {
        $(color).removeClass('highlighted')
        userSequence.push(color)
        if (sequence[0] === userSequence[0]) {
          console.log('you are right!!!')
          return
        }
        console.log('dude, its like the first round')
      },
      500
    )
  }

  const endTurn = () => {
    turn = turn === PLAYER ? COMPUTER : PLAYER

    if (turn === PLAYER) {
      $('#start').off('click')
      $('.green').on('click', () => {
        pressButton(GREEN)
      })

      $('.red').on('click', () => {
        pressButton(RED)
      })

      $('.blue').on('click', () => {
        pressButton(BLUE)
      })

      $('.yellow').on('click', () => {
        pressButton(YELLOW)
      })
    }
  }
})
