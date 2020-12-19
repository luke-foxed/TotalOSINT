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

  if (page.url().includes('domain')) {
    let createdDate = await detailsDiv.$eval(
      '.row > .field > a > vt-ui-time-ago',
      (el) => el.getAttribute('title')
    );

    return details
      .split('\n')
      .filter((item) => item)
      .concat([createdDate]);
  } else {
    return details.split('\n').filter((item) => item);
  }
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
    let results = {};

    switch (searchType) {
      case 'ip':
        await page.goto(
          `https://www.virustotal.com/gui/ip-address/${value}/detection`
        );

        let ipDetections = await getDetections(page);
        let ipDetails = await getDetails(page);

        try {
          results.url = page.url();
          results.detections = ipDetections[0];
          results.engines = ipDetections[2];
          results.range = ipDetails[0];
          results.owner = ipDetails[1];
          results.country = ipDetails[2];
        } catch (error) {
          results.url = page.url();
          results.detections = ipDetections[0];
          results.engines = ipDetections[2];
        }

        await browser.close();
        break;

      case 'hash':
        await page.goto(
          `https://www.virustotal.com/gui/file/${value}/detection`
        );

        let fileDetections = await getDetections(page);
        let fileDetails = await getDetails(page);

        try {
          results.url = page.url();
          results.detections = fileDetections[0];
          results.engines = fileDetections[2];
          results.file_name = fileDetails[1];
          results.file_size = fileDetails[2] + fileDetails[3];
        } catch (error) {
          results.detections = fileDetections[0];
          results.engines = fileDetections[2];
          results.url = page.url();
        }

        await browser.close();
        break;

      case 'domain':
        await page.goto(
          `https://www.virustotal.com/gui/domain/${value}/detection`
        );

        let domainDetections = await getDetections(page);

        results.detections = domainDetections[0];
        results.engines = domainDetections[2];
        results.url = page.url();

        await browser.close();
        break;
    }

    await puppeteer.__experimental_unregisterCustomQueryHandler('shadow');

    return results;
  } catch (error) {
    return error;
  }
};

module.exports = {
  searchVT,
};
