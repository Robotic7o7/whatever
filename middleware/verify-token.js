//jwt
const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
            if (err) {
                res.status(403).json({message:"AUTH_FAILED"})
            }
            else {
                req.auth = authData
                next()
            }
    
        })
        
    }
    else {
        res.status(403).json({message:"AUTH_FAILED"})
    }
}

module.exports = verifyToken;