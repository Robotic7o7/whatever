const mongoose = require('mongoose')

const teamSchema = mongoose.Schema({
    teamName: {
        type: String
    },

    teamCode: {
        type: String,
        required: true,
    },

    passKey: {
        type: String,
        required: true
    },

    teamWallet: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Team', teamSchema)