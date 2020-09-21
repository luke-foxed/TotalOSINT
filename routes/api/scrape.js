const express = require('express');
const { searchVT } = require('../../scrapers/virusTotal');
const router = express.Router();

router.post('/vt', async (req, res) => {
  searchVT(req.body.type, req.body.value);
  res.send('DONE');
});

module.exports = router;
