const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignup); //http://localhost:8001/signup/ 
router.post("/login", handleUserLogin); //http://localhost:8001/login

module.exports = router;
