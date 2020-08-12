const express = require("express");
const router = express.Router();

//load Url
const validUrl = require("valid-url");
const shortId = require("shortid");
const { BASE_URL } = require("../Config");
const Url = require("../Model/Url");

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  if (!validUrl.isUri(BASE_URL)) {
    return res.status(401).json("invalid base url");
  }
  //create url code
  const urlCode = shortId.generate();
  //check log url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = BASE_URL + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("SERVER ERROR");
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});

module.exports = router;