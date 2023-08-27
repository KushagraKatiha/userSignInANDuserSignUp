require('dotenv').config()
const express = require('express')
const dbConnect = require('./config/dbConnection.js')
const router = require('./Routes/homeRouts.js')

const app = express()
app.use(express.json())  
dbConnect()

app.use('/', router)

module.exports = app