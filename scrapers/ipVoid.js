const puppeteer = require('puppeteer');

const searchIPVoid = async (value) => {
  try {
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768 });
    await page.goto('https://www.ipvoid.com/ip-blacklist-check/');
    await page.waitForSelector('.col-md-8 #ipAddr', { timeout: 6000 });

    // delete current field input and type value
    await page.evaluate(() => {
      window.scrollBy(0, 200);
    });

    await page.click('.col-md-8 #ipAddr', { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type('.col-md-8 #ipAddr', value, { delay: 50 });

    await page.waitForSelector(
      '.row > .col-md-8 > .articles-col > .form > .btn',
      { timeout: 3000 }
    );

    await page.click('.row > .col-md-8 > .articles-col > .form > .btn');

    await page.waitForSelector('table', { timeout: 6000 });

    const tableData = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll('table tr td'));
      return tds.map((td) => td.innerText);
    });

    let results = {
      url: page.url(),
      blacklists: tableData[5],
      detections: tableData[5]
        .replace(/[A-Za-z]/g, '')
        .split('/')[0]
        .trim(),
      engines: tableData[5]
        .replace(/[A-Za-z]/g, '')
        .split('/')[1]
        .trim(),
      reverse_DNS: tableData[9],
      ASN_ownser: tableData[13],
      ISP: tableData[15],
      country: tableData[19],
    };

    await browser.close();

    return results;
  } catch (error) {
    console.log(error);
    return 'Error Scraping IPVoid: ' + error.msg;
  }
};

module.exports = {
  searchIPVoid,
};
