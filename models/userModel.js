const mongoose = require('mongoose')

const myModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        MaxLength: [50, "Name should be less than 50 chars"],
        MinLength: [5, "Name should be greater than 5 chars"]
    }, 

    email: {
        type: String, 
        requied: [true, "Email is required"],
        unique: [true, "User already registered with same email"]
    },

    password: {
        type: String,
        requied: [true, "Password is required"],
    },

    confirmPassword: {
        type: String,
        requied: [true, "Password is required"],
    }
})


module.exports = mongoose.model("UserNew", myModel)