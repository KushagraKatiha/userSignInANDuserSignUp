const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const myModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        MaxLength: [50, "Name should be less than 50 chars"],
        MinLength: [5, "Name should be greater than 5 chars"],
        trim: true
    }, 

    email: {
        type: String, 
        requied: [true, "Email is required"],
        unique: [true, "User already registered with same email"],
        trim: true
    },

    password: {
        type: String,
        requied: [true, "Password is required"],
        select: false
    },

    confirmPassword: {
        type: String,
        requied: [true, "Password is required"],
    }
}, {
    timestamps: true
})

    myModel.methods = {
        jwtToken(){
            return JWT.sign({
                "email": this.email, "id": this._id
            }, process.env.SECRET,{
                expiresIn:"24h"
            })
        }
    }


module.exports = mongoose.model("UserNew", myModel)