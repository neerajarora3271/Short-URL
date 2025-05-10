// const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");
const bcrypt = require("bcrypt");


async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.render("signup", {
      error: "Email already registered. Please log in.",
    });
  }
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("login");
}// jse hi login k button pr click hoga login  page open hoga check in static route






async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email,password });

    if (!user) {
      return res.render("login", {
        error: "User not found. Please sign up first.",
      });
    }

  

    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");

  } catch (err) {
    console.error("Login Error:", err);
    return res.render("login", {
      error: "An error occurred during login.",
    });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
