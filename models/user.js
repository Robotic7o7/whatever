const mongoose = require('mongoose')

const gymUserSchema = mongoose.Schema({

    userName: {
        type: String
    },

    email: {
        type: String
    },

    password: {
        type: String
    }
})

module.exports = mongoose.model('GymMember', gymUserSchema)