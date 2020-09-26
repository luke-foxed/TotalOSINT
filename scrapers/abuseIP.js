const puppeteer = require('puppeteer');

const abuseIP = async (value) => {
  try {
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(`https://www.abuseipdb.com/check/${value}`);

    await page.waitForSelector(
      '.content-wrapper > #report-wrapper > .row > .col-md-6 > .well',
      { timeout: 6000 }
    );

    let reportData = '';

    try {
      await page.waitForSelector('h3.text-primary', { timeout: 3000 });
      reportData = await page.evaluate(() => {
        let text = document.querySelector('h3.text-primary');
        return text.innerText;
      });
    } catch (error) {
      await page.waitForSelector('.well > p', { timeout: 3000 });
      reportData = await page.evaluate(() => {
        let text = document.querySelector('.well > p');
        return text.innerText;
      });
    }

    console.log(reportData);

    await browser.close();
  } catch (error) {
    return 'Error Scraping Data: ' + error.msg;
  }
};

module.exports = {
  abuseIP,
};
