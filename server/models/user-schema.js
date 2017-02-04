var mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = new Schema({
  username: String,
  password: String
}, {
  collection: 'users'
})

const Users = mongoose.model('users', User)

module.exports = Users
