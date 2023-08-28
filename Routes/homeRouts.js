const express = require('express')
const { home, signUp, signIn, getUser, logout } = require('../controllers/homeControler.js')
const jwtAuth = require('../middleware/authToken.js')
const router = express.Router()

router.get('/', home)
router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/user', jwtAuth ,getUser)
router.post('/logout', jwtAuth ,logout)


module.exports = router


