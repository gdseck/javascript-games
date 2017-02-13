const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const debug = require('debug')('passport-mongo')

const dbConfig = require('./server/db')
const mongoose = require('mongoose')

mongoose.connect(dbConfig.url)

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cookieParser())

app.use('/styles', express.static('styles'))
app.use('/js', express.static('js'))
app.use('/js', express.static('build'))

const passport = require('passport')
var session = require('express-session')

const initPassport = require('./server/passport/init')
initPassport(passport)

app.use(session({secret: 'mySecretKey'}))
app.use(passport.initialize())
app.use(passport.session())

const flash = require('connect-flash')
app.use(flash())

const routes = require('./server/routes')(passport)
app.use('/', routes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

app.set('port', process.env.PORT || 3000)

var server = app.listen(app.get('port'), () => {
  debug('Express server listening on port ' + server.address().port)
})
