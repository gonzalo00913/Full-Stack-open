const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

// middleware authenticateToken
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// middleware tokenExtractor
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  next();
};

// middleware userExtractor
const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return next();
  }

  const decodedToken = jwt.verify(request.token, secretKey);

  if (!decodedToken.id) {
    return next();
  }

  const user = await User.findById(decodedToken.id);
  request.user = user;

  next();
};

module.exports = {
  authenticateToken,
  tokenExtractor,
  userExtractor,
};

