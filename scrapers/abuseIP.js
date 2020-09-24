const { text } = require('body-parser');
const puppeteer = require('puppeteer');

const abuseIP = async (value) => {
  try {
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(`https://www.abuseipdb.com/check/${value}`);

    await page.waitForSelector(
      '.content-wrapper > #report-wrapper > .row > .col-md-6 > .well'
    );

    try {
      await page.waitForSelector('h3.text-primary', { timeout: 3000 });
      console.log('no report');
    } catch (error) {
      console.log('report');
    }

    // const reportData = await page.evaluate(() => {
    //   let text = document.querySelector('h3.text-primary');
    //   return text.innerText;
    // });

    // console.log(reportData);

    await browser.close();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  abuseIP,
};
