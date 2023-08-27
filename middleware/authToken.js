const JWT = require('jsonwebtoken')

const jwtAuth = (req, res, next) =>{

    // verify JWT token
    const token = (req.cookies && req.cookies.token) || null

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Not authorized"
        })
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET)
        req.user = {id: payload.id, email: payload.email}
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

    // inject user info in req


    next();
}

module.exports = jwtAuth