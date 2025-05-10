const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleGetRedirectToUrl
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/:shortId", handleGetRedirectToUrl)
router.get("/analytics/:shortId", handleGetAnalytics);
module.exports = router;
