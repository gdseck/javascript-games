'use strict'
var $ = require('jquery')
var jQuery = require('jquery')
var Promise = require('promise')

window.$ = $
window.jQuery = jQuery
window.Promise = Promise

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

  let computerTurn = function () {
    if (sequence.length < round) {
      new Promise(resolve => {
        console.log('inside resolve')
        let rand = Math.ceil(Math.random() * 4)
        console.log(rand)
        resolve(sequence.push(colors[Math.ceil(Math.random() * 4)]))
      }).then(() => {
        highlightBtn()
      })
    }
  }

  const flicker = () => {
    return new Promise(resolve => {
      $(sequence[currentColorIndex]).addClass('highlighted')
      setTimeout(
        () => $(sequence[currentColorIndex]).removeClass('highlighted'),
        300
      )
    })
  }

  const checkStatus = () => {
    return new Promise(resolve => {
      if (currentColorIndex < sequence.length - 1) {
        currentColorIndex++
        return true
      }

      if (currentColorIndex === sequence.length - 1) {
        console.log('computer turn end')
        currentColorIndex = 0
        endTurn()

        return false
      }
    })
  }

  const highlightBtn = () => {
    new Promise(flicker).then(() => checkStatus())
  }

  $('#start').on('click', function () {
    computerTurn()
  })

  const startComputerTurn = () => {
    setTimeout(computerTurn, 1000)
  }

  const resetUserRound = () => {
    userButtonsPressed = 0
    userSequence = []
  }

  const pressButton = color => {
    $(color).addClass('highlighted')
    setTimeout(
      function () {
        $(color).removeClass('highlighted')
        userSequence.push(color)
        console.log(userSequence)
        let error = false
        for (let i = 0; i <= userButtonsPressed; i++) {
          if (userSequence[i] !== sequence[i]) {
            error = true
            break
          }
        }
        if (error) {
          console.log('loser')
        }

        if (!error && userSequence.length === sequence.length) {
          console.log('all correct')
          resetUserRound()
          endTurn()
          round++
          startComputerTurn()
          return
        }

        userButtonsPressed++
      },
      200
    )
  }

  const endTurn = () => {
    turn = turn === PLAYER ? COMPUTER : PLAYER
    console.log('turn ended: new turn = ', turn)

    if (turn === PLAYER) {
      console.log('inside player')
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
      console.log('go computer')
      $('.green').off('click')
      $('.red').off('click')
      $('.blue').off('click')
      $('.yellow').off('click')
    }
  }
})
