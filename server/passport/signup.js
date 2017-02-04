const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user-schema')
const bCrypt = require('bcrypt-nodejs')

module.exports = (passport) => {
  passport.use('signup',
    new LocalStrategy({
      passReqToCallback: true
    }, (req, username, password, done) => {
      console.log('inside register')
      const findOrCreateUser = () => {
        User.findOne({
          username: username
        }, (err, user) => {
          console.log(err, user)
          if (err) {
            console.log(`Error in SignUp ${err}`)
            return done(err)
          }

          if (user) {
            console.log('User already exists')
            return done(null, false,
              req.flash('message', 'User Already exists'))
          }

          const newUser = new User()
          newUser.username = username
          newUser.password = createHash(password)

          newUser.save((err) => {
            if (err) {
              console.log(`Error while saving user: ${err}`)
            }
            console.log('User Registration succesful')
            return done(null, newUser)
          })
        })
      }

      process.nextTick(findOrCreateUser)
    })
  )
}

var createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}
