const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];  // Extract token from the "Bearer <token>" format

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send('Invalid token');
            }

            req.user = user;  // Attach user info to request
            next();
        });
    } else {
        res.status(401).send('Authorization token missing');
    }
};

module.exports = authenticateJWT;
