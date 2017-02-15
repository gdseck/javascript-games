'use strict'
var $ = require('jquery')
var jQuery = require('jquery')
var Promise = require('bluebird')

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

  let currentColorIndex = 0
  let sequence = []
  let userSequence = []
  let playerPressCount = 0
  let round = 1

  $('#start').on('click', function () {
    computerTurn()
  })

  const computerTurn = function () {
    let rand = Math.ceil(Math.random() * 4) - 1
    sequence.push(colors[rand])
    highlightBtn()
  }

  const highlightBtn = () => {
    flash().then(() => {
      checkStatus()
    })
  }

  const flash = () => new Promise(function (resolve) {
    $(sequence[currentColorIndex]).addClass('highlighted')
    setTimeout(
      function () {
        resolve($(sequence[currentColorIndex]).removeClass('highlighted'))
      },
      300
    )
  })

  const checkStatus = () => {
    if (round === currentColorIndex + 1) {
      currentColorIndex = 0
      endTurn()

      return
    }

    currentColorIndex++
    highlightBtn()
  }

  const startComputerTurn = () => {
    setTimeout(computerTurn, 1000)
  }

  const btnPress = color => {
    $(color).addClass('highlighted')
    setTimeout(
      () => {
        $(color).removeClass('highlighted')
      },
      200
    )
  }

  const checkPlayerStatus = color => {
    userSequence.push(color)
    playerPressCount++

    if (userSequence[playerPressCount - 1] !== sequence[playerPressCount - 1]) {
      console.log('LOSER')
      return
    }

    if (userSequence.length === sequence.length) {
      playerPressCount = 0
      userSequence = []
      round++
      endTurn()
      startComputerTurn()
      return
    }
  }

  const pressButton = color => {
    new Promise(
      resolve => resolve(btnPress(color))
    ).then(() => checkPlayerStatus(color))
  }

  const endTurn = () => {
    turn = turn === PLAYER ? COMPUTER : PLAYER

    if (turn === PLAYER) {
      $('#start').off('click')
      colors.forEach(color => addClickHandler(color))
    }

    if (turn === COMPUTER) {
      colors.forEach(color => removeClickHandler(color))
    }
  }

  const addClickHandler = (color) => {
    $(color).on('click', () => {
      pressButton(color)
    })
  }

  const removeClickHandler = color => {
    $(color).off('click')
  }
})
