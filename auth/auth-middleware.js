const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, "dontbesuspicious", (error, decodedToken) => {
            if(error) {
                res.status(401).json({ message: "Invalid token" });
            }
            else {
                req.jwt = decodedToken;

                next();
            }
        });
    }
    else {
        res.status(401).json({ message: "Please provide token" });
    }
}