const authenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("Unauthenticated Request!");
  }
};

module.exports = authenticatedUser;
