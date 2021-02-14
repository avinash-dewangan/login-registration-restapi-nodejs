const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        var token = req.headers.authorization.split(" ")[1];
        var decode = jwt.verify(token, 'secret');
        req.userData = decode;
        next();
    } catch (err) {
        res.status(401).json({
            err: "Invalid Token"
        })
    }
}