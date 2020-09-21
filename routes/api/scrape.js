const express = require('express');
const { searchVT } = require('../../scrapers/virusTotal');
const router = express.Router();

router.post('/vt', async (req, res) => {
  let results = await searchVT(req.body.type, req.body.value);
  res.send(results);
});

module.exports = router;
