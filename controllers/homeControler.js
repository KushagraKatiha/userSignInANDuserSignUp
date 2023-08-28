// const { default: mongoose } = require('mongoose');
const UserNew = require('../models/userModel.js')
const JWT = require('jsonwebtoken')
const emailValidator = require('email-validator')
const bcrypt = require ('bcrypt')

const home = (req, res)=>{
    res.send('<h1>Home Page</h1>')
}

// To register new user

const signUp = async (req, res)=>{
    try {
        const {name, email , password, confirmPassword} = req.body;

        if(!name || !email || !password || !confirmPassword){
            throw new Error("All fields are required !!")
        }

        let validEmail = emailValidator.validate(email)
        if(!validEmail){
            throw new Error("Please enter valid email")
        }

        const userExists = await UserNew.findOne({email})
        if(userExists){
            throw new Error("User already exists")
        }

        if(password != confirmPassword){
            throw new Error("Password and confirm password didn't match !!")
        }

        const user = UserNew(req.body)
        const userInfo = user.save()

        res.status(200).json({
            success: true,
            message: "User created successfully !!"
        })


    } catch (err) {
        res.status(400).json({
            success: "fail",
            message: err.message
        })
    }
}

// To signIn user 

const signIn = async (req, res)=>{
    try {
        const {email, password} = req.body

        if(!email, !password){
            throw new Error("All fields are required !")
        }

        const findUser = await UserNew.findOne({email}).select('+password')
        if(!findUser){
            throw new Error("No user regestered with this email id !")
        }

        if(!bcrypt.compare(password ,findUser.password)){
            throw new Error("Password didn't match")
        }

        const token = findUser.jwtToken()
        findUser.password= undefined
        
        const cookieOptions = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }

        res.cookie("token", token, cookieOptions)


        res.status(200).json({
            success: true,
            message: "User Logged in Successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// To get user Info

const getUser = async (req, res) =>{
    try {
        const userId = req.user.id

        const user = await UserNew.findById(userId)

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(401).json({
            success: false, 
            message: error.message
        })
    }
}


module.exports={home, signUp, signIn, getUser }