const express = require('express')
const router = express.Router()

var isAuthenticated = function (req, res, next) {
  console.log('herre')
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')
}

module.exports = (passport) => {
  router.get('/', (req, res) => {
    res.render('index', { message: req.flash('message') })
  })

  router.post('/login',
    passport.authenticate('login', {
      successRedirect: '/home',
      failureRedirect: '/',
      failureFlash: true
    })
  )

  router.get('/signup', function (req, res) {
    res.render('register', { message: req.flash('message') })
  })

  router.get('/home', isAuthenticated, (res, req) => {
    console.log('helloooooo?????')
    console.log(isAuthenticated)
    res.render('home', { user: req.user })
  })

  router.get('/signout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  }))

  router.get('/simon-says', isAuthenticated, (res, req) => {
    res.render('simon-says')
  })

  return router
}
