const puppeteer = require('puppeteer');

const searchIPVoid = async (value) => {
  try {
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768 });
    await page.goto('https://www.ipvoid.com/ip-blacklist-check/');
    await page.waitForSelector('.col-md-8 #ipAddr');

    // delete current field input and type value
    await page.evaluate(() => {
      window.scrollBy(0, 200);
    });

    await page.click('.col-md-8 #ipAddr', { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type('.col-md-8 #ipAddr', value, { delay: 50 });

    await page.waitForSelector(
      '.row > .col-md-8 > .articles-col > .form > .btn'
    );

    await page.click('.row > .col-md-8 > .articles-col > .form > .btn');

    await page.waitForSelector('table');

    const tableData = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll('table tr td'));
      return tds.map((td) => td.innerText);
    });

    let results = {
      blacklists: tableData[5],
      reverseDNS: tableData[9],
      asnOwnser: tableData[13],
      isp: tableData[15],
    };

    await browser.close();

    return results;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  searchIPVoid,
};
