const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login"); // agr koi b current user nhi aaya checkauth se to dubara login pr jaao or kho ki phle loginb kro
  const allurls = await URL.find({ createdBy: req.user._id }); // req.user is created by auth.js middlewares ,agr req.user_id (jo b h ) vo urls(collection) wale db mai mil jati h to srf whi url show honge screen pr 
  return res.render("home", {
    urls: allurls,
  });
}); //http://localhost:8001/




router.get("/signup", (req, res) => {
  return res.render("signup");
});//http://localhost:8001/signup  
// open signup page

router.get("/login", (req, res) => {
  return res.render("login");
}); //http://localhost:8001/login 
// open login page

module.exports = router;
