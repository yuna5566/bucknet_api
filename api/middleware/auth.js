const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(" ")[1];
        const decode_token = jwt.verify(accessToken, process.env.JWT_KEY); 
        req.userData = decode_token;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid Authentication...'
        });
    }
}

module.exports = auth;