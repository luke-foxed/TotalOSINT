const puppeteer = require('puppeteer');

const searchAbuseIP = async (value) => {
  const defaultTimeout = { timeout: 5000 };
  try {
    let browser = await puppeteer.launch({ headless: true });
    let page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(`https://www.abuseipdb.com/check/${value}`);

    await page.waitForSelector(
      '.content-wrapper > #report-wrapper > .row > .col-md-6 > .well',
      defaultTimeout
    );

    let reportData = '';

    try {
      await page.waitForSelector('h3.text-primary', defaultTimeout);
      reportData = await page.evaluate(() => {
        let text = document.querySelector('h3.text-primary');
        return text.innerText;
      });
    } catch (error) {
      await page.waitForSelector('.well > p', defaultTimeout);
      const report = await page.evaluate(() => {
        let boldLabels = Array.from(document.querySelectorAll('.well > p > b'));
        return boldLabels.map((label) => label.innerText);
      });

      const tableData = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('.well .table tr td'));
        return tds.map((td) => td.innerText);
      });

      reportData = {
        number_of_reports: report[0],
        abuse_score: report[1],
        details: {
          url: page.url(),
          ISP: tableData[0],
          domain: tableData[2],
          country: tableData[3],
        },
      };
    }

    await browser.close();

    return reportData;
  } catch (err) {
    console.error(err);
    return { error: 'Error Scraping AbuseIP' };
  }
};

module.exports = {
  searchAbuseIP,
};
