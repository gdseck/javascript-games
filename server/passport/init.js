const login = require('./login')
const signup = require('./signup')
const User = require('../models/user-schema')

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findOne({id: id}, (err, user) => {
      if (err) console.log(err)
      done(err, user)
    })
  })

  login(passport)
  signup(passport)
}
