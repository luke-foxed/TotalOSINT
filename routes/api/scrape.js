const express = require('express');
const { searchIPVoid } = require('../../scrapers/ipVoid');
const { searchVT } = require('../../scrapers/virusTotal');
const { abuseIP } = require('../../scrapers/abuseIP');
const { searchMetadefender } = require('../../scrapers/metaDefender');
const { Cluster } = require('puppeteer-cluster');
const router = express.Router();

// TEST VALUES //

// malicious hash: 36F9CA40B3CE96FCEE1CF1D4A7222935536FD25B
// clean hash: e75717a75f2a35130bf7f7aee09dcb7d

// clean IP: 43.250.192.22
// malicious IP: 89.248.167.164

// clean domain: google.com
// malicious domain: halifax-fraud-alert.com

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

router.post('/metadefender', async (req, res) => {
  let results = await searchMetadefender(req.body.type, req.body.value);
  res.send(results);
});

// link for running sessions in parallel
// https://github.com/puppeteer/puppeteer/issues/1873

router.post('/scrape-all', async (req, res) => {
  let results = {};

  switch (req.body.type) {
    case 'domain':
      const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 3,
      });

      cluster.queue(async () => {
        results['metadefender'] = await searchMetadefender(
          req.body.type,
          req.body.value
        );
      });

      cluster.queue(async () => {
        results['virustotal'] = await searchVT(req.body.type, req.body.value);
      });

      await cluster.idle();
      await cluster.close();

      console.log(results);

      break;

    default:
      break;
  }
});

module.exports = router;
