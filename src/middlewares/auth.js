const jwt = require("jsonwebtoken")
const SECRET_KEY = "NOTESAPI"

const auth = (req, res, next)=> {
    try {
        let token = req.headers.authorization
        if(token){
            token = token.split(" ")[1]
            let user = jwt.verify(token, SECRET_KEY)
            req.userId = user.id
            next()
        }
        else{
            res.status(401).json({message: "Unauthorized User"})
        }

    } catch(error){
        console.log(error);
        res.status(401).json({message: "Unauthorized User"})
    }
}

const requireAdmin = (req, res, next)=> {

    var token = req.body.token

    if (token) {
        jwt.verify(token,SECRET_KEY, function (err, decoded) {
            if (err) {
                return res.status(401).json({message: 'Failed to authenticate token.' })
            } else {
                req.decoded = decoded;
                next();
            }
        })

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        })
    }
}

module.exports = {auth, requireAdmin}