const express = require('express');
const { searchIPVoid } = require('../../scrapers/ipVoid');
const { searchVT } = require('../../scrapers/virusTotal');
const { abuseIP } = require('../../scrapers/abuseIP');
const router = express.Router();

router.post('/vt', async (req, res) => {
  let results = await searchVT(req.body.type, req.body.value);
  res.send(results);
});

router.post('/ipvoid', async (req, res) => {
  let results = await searchIPVoid(req.body.value);
  res.send(results);
});

router.post('/abuse', async (req, res) => {
  let results = await abuseIP(req.body.value);
  res.send(results);
});

module.exports = router;
