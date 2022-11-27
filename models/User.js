const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 30
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        min: 7,
        max: 100
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 255
    }
})

module.exports = mongoose.model('Users', UserSchema);
