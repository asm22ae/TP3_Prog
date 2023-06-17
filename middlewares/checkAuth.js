const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = authHeader.split(" ")
    token = token[1];
    if (!token) {
      return res.status(401).json({ message: 'Vous devez être connecté pour accéder à cette ressource.' });
    }
    
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = {
      userId: payload._id,
      email: payload.email,
      isAdmin: payload.isAdmin
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Token invalide.' });
  }
};

module.exports = checkAuth;
