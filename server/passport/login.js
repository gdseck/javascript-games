const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user-schema')
var bCrypt = require('bcrypt-nodejs')

module.exports = passport => {
  passport.use('login', new LocalStrategy({ passReqToCallback: true }, (
    req,
    username,
    password,
    done
  ) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err)
      }

      if (!user) {
        console.log('User Not Found with username ' + username)
        return done(null, false, req.flash('message', 'User not found'))
      }

      if (!isValidPassword(user, password)) {
        console.log('Invalid Password')
        return done(null, false, req.flash('message', 'Invalid Password'))
      }

      return done(null, user)
    })
  }))
}

var isValidPassword = function (user, password) {
  return bCrypt.compareSync(password, user.password)
}
