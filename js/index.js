import simon from './simon-says.js'
import $ from 'jquery'

export { simon as default } from './simon-says.js'

$(document).ready(function () {
  $('.burger-menu').on('click', function () {
    $('.navbar-wrapper').fadeOut()
  })
})
