const puppeteer = require('puppeteer');
const { QueryHandler } = require('query-selector-shadow-dom/plugins/puppeteer');

const searchVT = async (searchType, value) => {
  await puppeteer.__experimental_registerCustomQueryHandler(
    'shadow',
    QueryHandler
  );

  try {
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    // data to be returned
    let results = {
      value: '',
      detections: 0,
      engines: 0,
      fileName: '',
      fileSize: '',
      owner: '',
      range: '',
      country: '',
      registrar: '',
      creationDate: 0,
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

        // get 'whois' info
        results.range = ipText['0'].__miniGraphInfo.network;
        results.owner = ipText['0'].__miniGraphInfo.as_owner;
        results.country = ipText['0'].__miniGraphInfo.country;

        await browser.close();
        break;

      case 'hash':
        await page.goto(
          `https://www.virustotal.com/gui/file/${value}/detection`,
          { waitUntil: 'networkidle0' }
        );

        await page.waitForSelector('shadow/.engines .circle');
        let enginesDiv = (await page.$('shadow/.engines .circle')).asElement();

        let detections = await (
          await enginesDiv.getProperty('textContent')
        ).jsonValue();

        let formattedDetections = detections
          .replace(/\s{2,}/g, ' ')
          .split(' ')
          .filter((item) => item);

        try {
          results.detections = parseInt(formattedDetections[0]);
          results.engines = parseInt(formattedDetections[2]);
        } catch (error) {
          console.log(error);
        }

        await page.waitForSelector('shadow/div[slot="body"]');
        let fileDiv = (await page.$('shadow/div[slot="body"]')).asElement();

        let fileDetails = await (
          await fileDiv.getProperty('textContent')
        ).jsonValue();

        let formattedFileDetails = fileDetails
          .replace(/\s{2,}/g, ' ')
          .split(' ')
          .filter((item) => item);

        try {
          results.fileName = formattedFileDetails[1];
          results.fileSize = formattedFileDetails[2] + formattedFileDetails[3];
        } catch (error) {
          console.log(error);
        }

        results.value = value;

        console.log(results);

        await browser.close();
        break;

      case 'domain':
        await page.goto(
          `https://www.virustotal.com/gui/domain/${value}/detection`
        );

        await page.waitForSelector('body #domain-view', { timeout: 6000 });

        const domainText = await page.evaluate(() =>
          document.querySelectorAll('body #domain-view')
        );

        let {
          __engineDetections: domainDetections,
          __totalEngines: domainEngines,
        } = domainText['0'];

        results.detections = domainDetections;
        results.engines = domainEngines;

        // get domain info
        results.registrar = domainText['0'].__headerProperties.registrar;
        results.creationDate = domainText['0'].__headerProperties.creationDate;

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
