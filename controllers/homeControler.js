const { default: mongoose } = require('mongoose');
const UserNew = require('../models/userModel.js')

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

        const userExists = await UserNew.findOne({email})
        if(userExists){
            throw new Error("User already exists")
        }

        if(password != confirmPassword){
            throw new Error("Password and confirm password didn't match !!")
        }

        const user = await UserNew.create({
            name,
            email,
            password
        })

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

        const findUser = await UserNew.findOne({email})
        if(!findUser){
            throw new Error("No user regestered with this email id !")
        }

        if(password != findUser.password){
            throw new Error("Password didn't match")
        }
        
        res.status(200).json({
            success: true,
            message: "User Logged in Successfully"
        })

    } catch (error) {
        req.status(400).json({
            success: false,
            message: error.message
        })
    }
}


module.exports={home, signUp, signIn}