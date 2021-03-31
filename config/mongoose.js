const mongoose = require('mongoose')

//connect
const MONGODB_URI = "mongodb://localhost/shortener-url"
mongoose.connect(MONGODB_URI, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.once('open', () => {
    console.log('mongodb is running')
})

db.on('error', () => {
    console.log('mongodb error')
})

module.exports = db