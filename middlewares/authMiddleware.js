
const jwt = require('jsonwebtoken');
const { secret } = require('../crypto/config');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No hay token" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token no válido o expirado" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };