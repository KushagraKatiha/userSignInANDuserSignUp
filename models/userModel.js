const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const bcrypt = require ('bcrypt')
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
        select: false
    }
}, {
    timestamps: true
})

    myModel.pre('save', async function (next){
        if(!this.isModified('password') || (!this.isModified('confirmPassword')) ){
            return next()
        }

        this.password = await bcrypt.hash(this.password, 10) 
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10)
        return next()
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