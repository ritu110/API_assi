const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { sign, verify } = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const createToken = (user) => {
  const accessToken = sign(
    { username: user.username, userId: user._id },
    SECRET_KEY
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
  const token = req.cookies["access-token"];
  if (!token) {
    return res.json({ error: "User not authenticated" });
  }

  try {
    const isValidToken = verify(token, SECRET_KEY);
    if (isValidToken) {
      req.authenticated = true;
      next();
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createToken, validateToken };
