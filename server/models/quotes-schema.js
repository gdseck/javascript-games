const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Quote = new Schema({
  name: String,
  quote: String
}, {
  collection: 'quotes'
})

const Quotes = mongoose.model('quotes', Quote)

module.exports = Quotes
