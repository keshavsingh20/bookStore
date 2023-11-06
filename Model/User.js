const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String,},
    email: {type: String,},
    password: {type: String,},
    phoneNo: {type: Number,},
    role: {type: String, },
    orders: {type: Array},
    address: {type: String},
    state: {type: String},
    country: {type: String},
    pin: {type: Number}
})

const User = mongoose.model("users", userSchema);

module.exports = User;