/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {

    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secrets.jwtSecrets, (err, decodedBananaToken) => {
            if (err) {
                res.status(401).json({ you: 'shall not pass!' });
            } else {
                req.decodedJwt = decodedBananaToken;
                console.log(req.decodedJwt);
                next();
            }
        })
    } else {
        res.status(401).json({ you: "can't touch that." })
    }
};
