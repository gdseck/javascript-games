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
  let userButtonsPressed = 0
  let sequence = [ GREEN, GREEN ]
  let userSequence = []

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
        let error = false
        for (let i = 0; i <= userButtonsPressed; i++) {
          if (userSequence[i] !== sequence[i]) {
            error = true
            break
          }
        }
        if (!error) {
          if (userSequence.length === sequence.length) {
            console.log('all correct')
            userButtonsPressed = 0
            endTurn()
            return
          }
          userButtonsPressed++
          return
        }

        console.log('loser')
        userButtonsPressed = 0
        sequence = []
        userSequence = []
      },
      200
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

    if (turn === COMPUTER) {
      $('#start').on('click', function () {
        intervalID = setInterval(() => flicker(), 1000)
      })

      $('.green').off('click')
      $('.red').off('click')
      $('.blue').off('click')
      $('.yellow').off('click')
    }
  }
})
