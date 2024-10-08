// Middleware for protected routes
const authenticateSession = (req, res, next) => {
    if (req.session.userId) {
        next(); // User is authenticated, proceed to the next middleware or route handler
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

module.exports = authenticateSession;
