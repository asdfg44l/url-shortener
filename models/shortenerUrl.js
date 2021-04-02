const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortenerUrl = new Schema({
    content: {
        type: String,
        require: true
    },
    redirect: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('ShortenerUrl', shortenerUrl)