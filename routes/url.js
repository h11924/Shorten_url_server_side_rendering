const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

// router.post is used to create new data (shortening the URL)
router.post("/", handleGenerateNewShortURL);

// router.get is used to retrieve analytics data
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;

/**
 * "Welcome!

If you are here to give me a long URL so I can shorten it (POST), go to Room 1 and talk to the Link Maker.

If you are here because you want to see how many clicks you got (GET), go to Room 2 and talk to the Stat Checker.

I don't make the links or count the clicks myself; I just tell you which room to go to!"
 */