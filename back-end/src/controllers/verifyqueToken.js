const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function verifycateToken(req, res, next){//MIDDELWARE
    const token = req.headers['x-access-token'];
    if(!token){
        return res.json({
            status: 401,
            authToken: false,
            message: 'No token provided'
        });
    }
    
    jwt.verify(token, secret, (err, decoded) => {
        if(err){
            return res.json({ 
                status: 401,
                authToken: false,
                mensaje: 'Invalid token' }); 
        }else{
            req.userId = decoded.id;
            res.authToken = true; 
            next();
        }
    });
}

module.exports = verifycateToken;