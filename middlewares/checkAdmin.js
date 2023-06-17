const checkAdmin = (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  if (isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Vous n'avez pas le droit d'accéder!" });
  }
};

module.exports = checkAdmin;
