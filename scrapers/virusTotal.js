const puppeteer = require('puppeteer');
const { QueryHandler } = require('query-selector-shadow-dom/plugins/puppeteer');

const getDetections = async (page) => {
  await page.waitForSelector('shadow/.engines .circle');

  let enginesDiv = await page.$('shadow/.engines .circle');
  let detections = await (
    await enginesDiv.getProperty('textContent')
  ).jsonValue();

  return detections.split(' ').filter((item) => item);
};

const getDetails = async (page) => {
  await page.waitForSelector('shadow/div[slot="body"]');

  let detailsDiv = await page.$('shadow/div[slot="body"]');
  let details = await (await detailsDiv.getProperty('innerText')).jsonValue();
  return details.split('\n').filter((item) => item);
};

const searchVT = async (searchType, value) => {
  // setup custom handler for accessing shadow dom
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
        await page.goto(
          `https://www.virustotal.com/gui/ip-address/${value}/detection`
        );

        let ipDetections = await getDetections(page);
        let ipDetails = await getDetails(page);

        try {
          results.detections = parseInt(ipDetections[0]);
          results.engines = parseInt(ipDetections[2]);
          results.range = ipDetails[0];
          results.owner = ipDetails[1];
          results.country = ipDetails[2];
        } catch (error) {
          console.log(error);
        }
        results.value = value;

        await browser.close();
        break;

      case 'hash':
        await page.goto(
          `https://www.virustotal.com/gui/file/${value}/detection`
        );

        let fileDetections = await getDetections(page);
        let fileDetails = await getDetails(page);

        try {
          results.detections = parseInt(fileDetections[0]);
          results.engines = parseInt(fileDetections[2]);
          results.fileName = fileDetails[1];
          results.fileSize = fileDetails[2] + fileDetails[3];
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

    await puppeteer.__experimental_unregisterCustomQueryHandler('shadow');

    return results;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  searchVT,
};
