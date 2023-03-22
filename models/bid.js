const mongoose = require('mongoose')

const bidSchema = mongoose.Schema({
    teamCode: {
        type: String
    },

    questionNo: {
        type: String
    },

    bidAmount: {
        type: Number
    }
})

module.exports = mongoose.model('Bid', bidSchema)