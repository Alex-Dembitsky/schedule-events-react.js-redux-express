const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    email: String,
    password: String,
    events: [{
        id: String,
        title: String,
        start: Number,
        duration: Number
    }]
});

const User = mongoose.model("User", userScheme);

module.exports = User;