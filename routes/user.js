const express = require("express");
const { handleUserSignup, handleUserLogin ,handleLogout} = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignup); //http://localhost:8001/user/signup/ 
router.post("/login", handleUserLogin); //http://localhost:8001/user/login
router.post("/logout", handleLogout);
module.exports = router;
