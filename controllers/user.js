const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const { createToken, validateToken } = require("../jwt/auth");

const userRegistration = async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res.json({ error: "All fields are mandatory" });
  }
  if (!(Number(username) + "" === "NaN" && Number(password) + "" === "NaN")) {
    return res.json({ error: "Username and Password must be string" });
  }
  if (username.length < 4) {
    return res.json({ error: "Username must be at least 4 characters long" });
  }
  if (password.length < 6) {
    return res.json({ error: "Password must be at least 6 characters long" });
  }
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.json({ error: "User already exist" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User Registered Successfully" });
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.json({ error: "User doesn't exist" });
  }
  const isPwdValid = await bcrypt.compare(password, user.password);
  if (!isPwdValid) {
    return res.json({ error: "Password is incorrect" });
  }
  const token = createToken(user);
  res.cookie("access-token", token, {
    maxAge: 30 * 60 * 60 * 24 * 1000,
  });
  res.json({ message: "User Successfully Login" });
};

module.exports = { userRegistration, userLogin };
