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

        await page.waitForSelector('.row > .col-lg-3 > .scoreHeader .score');

        let ipScore = await page.evaluate(() => {
          let text = Array.from(document.querySelectorAll('.score > p'));
          return text.map((label) => label.innerText).toString();
        });

        console.log(ipScore);

        await browser.close();
        break;

      case 'hash':
        await browser.close();
        break;

      case 'domain':
        let base64Domain = Buffer.from(value).toString('base64');

        await page.goto(
          `https://metadefender.opswat.com/results/domain/${base64Domain}`
        );

        await page.waitForSelector('.row > .col-lg-3 > .scoreHeader');

        let domainScore = await page.evaluate(() => {
          let text = document.querySelector('.score');
          return text.innerText;
        });

        console.log(domainScore.replace(/^\s+|\s+$/g, ''));

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
