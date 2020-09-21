const puppeteer = require('puppeteer');

const searchVT = async (searchType, value) => {
  try {
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    // data to be returned
    let results = {
      value: '',
      detections: 0,
      engines: 0,
      owner: '',
      range: '',
      country: '',
    };

    switch (searchType) {
      case 'ip':
        // first get main details
        await page.goto(
          `https://www.virustotal.com/gui/ip-address/${value}/detection`
        );

        await page.waitForSelector('body #ip-address-view');

        const ipText = await page.evaluate(() =>
          document.querySelectorAll('body #ip-address-view')
        );

        let {
          __engineDetections: ipDetections,
          __totalEngines: ipEngines,
        } = ipText['0'];

        results.value = value;
        results.detections = ipDetections;
        results.engines = ipEngines;

        // then get 'whois' info
        results.range = ipText['0'].__miniGraphInfo.network;
        results.owner = ipText['0'].__miniGraphInfo.as_owner;
        results.country = ipText['0'].__miniGraphInfo.country;

        await browser.close();
        break;

      case 'hash':
        await page.goto(
          `https://www.virustotal.com/gui/file/${value}/detection`
        );

        await page.waitForSelector('body #file-view');

        const fileText = await page.evaluate(() =>
          document.querySelectorAll('body #file-view')
        );

        let {
          __engineDetections: fileDetections,
          __totalEngines: fileEngines,
        } = fileText['0'];

        results.detections = fileDetections;
        results.engines = fileEngines;

        await browser.close();
        break;

      case 'domain':
        await page.goto(
          `https://www.virustotal.com/gui/domain/${value}/detection`
        );

        await page.waitForSelector('body #domain-view');

        const domainText = await page.evaluate(() =>
          document.querySelectorAll('body #domain-view')
        );

        let {
          __engineDetections: domainDetections,
          __totalEngines: domainEngines,
        } = domainText['0'];

        results.detections = domainDetections;
        results.engines = domainEngines;

        // then get 'whois' info
        results.owner = domainText['0'].__miniGraphInfo.as_owner;
        results.country = domainText['0'].__miniGraphInfo.owner;

        await browser.close();
        break;
    }
    return results;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  searchVT,
};
