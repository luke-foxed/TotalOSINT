const puppeteer = require('puppeteer');

const searchVT = async (searchType, value) => {
  try {
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    switch (searchType) {
      case 'ip':
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

        console.log(`${ipDetections}/${ipEngines}`);

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

        console.log(`${fileDetections}/${fileEngines}`);

        await browser.close();
        break;

      default:
        break;
    }
  } catch (error) {}
};

module.exports = {
  searchVT,
};
