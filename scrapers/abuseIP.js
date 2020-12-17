const puppeteer = require('puppeteer');

const searchAbuseIP = async (value) => {
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
      await page.waitForSelector('h3.text-primary', { timeout: 5000 });
      reportData = await page.evaluate(() => {
        let text = document.querySelector('h3.text-primary');
        return text.innerText;
      });
    } catch (error) {
      await page.waitForSelector('.well > p', { timeout: 5000 });
      const report = await page.evaluate(() => {
        let boldLabels = Array.from(document.querySelectorAll('.well > p > b'));
        return boldLabels.map((label) => label.innerText);
      });

      const tableData = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('.well .table tr td'));
        return tds.map((td) => td.innerText);
      });

      console.log(tableData);

      reportData = {
        numberOfReports: report[0],
        abuseScore: report[1],
        isp: tableData[0],
        domain: tableData[2],
        country: tableData[3],
      };
    }

    await browser.close();

    return reportData;
  } catch (error) {
    return 'Error Scraping AbuseIP: ' + error.msg;
  }
};

module.exports = {
  searchAbuseIP,
};
