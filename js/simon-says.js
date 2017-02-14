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

  const colors = [ GREEN, RED, BLUE, YELLOW ]

  let intervalID = null
  let currentColorIndex = 0
  let userButtonsPressed = 0
  let sequence = []
  let userSequence = []
  let round = 1

  let flicker = function () {
    if (sequence.length <= round) {
      sequence.push(colors[Math.ceil(Math.random() * 4)])
    }
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
            setTimeout(
              () => setInterval(flicker, 1000),
              500
            )
            round++
            return
          }
          userButtonsPressed++
          return
        }

        console.log('loser')
        userButtonsPressed = 0
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
