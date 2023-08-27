require('dotenv').config()
const express = require('express')
const dbConnect = require('./config/dbConnection.js')
const cookieParser = require('cookie-parser')
const router = require('./Routes/homeRouts.js')

const app = express()
app.use(express.json())  
app.use(cookieParser())
dbConnect()

app.use('/', router)

module.exports = app