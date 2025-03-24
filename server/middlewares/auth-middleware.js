const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const AuthenticateToken = (req , res , next ) => {
    const token = req.cookies.accessToken;
    if(!token) {
        return res.status(401).json({ message : 'Unauthorized access token!'});
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        res.status(401).json({ message : 'Invalid access token!'});
    }
}

module.exports = AuthenticateToken;