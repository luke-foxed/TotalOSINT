const puppeteer = require('puppeteer');

const searchMetadefender = async (searchType, value) => {
  try {
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768 });

    switch (searchType) {
      case 'ip':
        let base64IP = Buffer.from(value).toString('base64');

        await page.goto(
          `https://metadefender.opswat.com/results/ip/${base64IP}`
        );

        await page.waitForSelector('.row > .col-lg-3 > .scoreHeader');

        let ipScore = await page.evaluate(() => {
          let text = document.querySelector('.score');
          return text.innerText;
        });

        console.log(ipScore.replace(/^\s+|\s+$/g, ''));

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

        // get file info
        results.fileName = fileText['0'].__headerProperties.fileName;
        results.fileSize = fileText['0'].__headerProperties.size;

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
    return 'hello';
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  searchMetadefender,
};
