const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../userModel/userSchema');

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  
  if(!token) return res.send({auth: false, message: "no token provided"});

  jwt.verify(token, config.secret, function(err, decoded) {
    
    if(err) return res.send({auth: false, message: "token authentication failed"});
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
