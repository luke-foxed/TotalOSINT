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
          let labels = text.map((label) => label.innerText).toString();
          if (labels.substring(0, 1) === ',') {
            labels = '0' + labels;
          }
          return labels.split('\n')[0].replace(',', '');
        });

        await browser.close();

        let ipScoreFormatted = {
          detections: ipScore.split('/')[0],
          engines: ipScore.split('/')[1],
          details: {
            url: page.url(),
          },
        };
        return ipScoreFormatted;

      case 'hash':
        await page.goto(
          `https://metadefender.opswat.com/results/file/${value}/hash`
        );

        await page.waitForSelector('.scoreHeader > .score');

        let hashScore = await page.evaluate(() => {
          let text = Array.from(
            document.querySelectorAll('.scoreHeader > .score  > p')
          );
          let labels = text.map((label) => label.innerText).toString();
          if (labels.substring(0, 1) === ',') {
            labels = '0' + labels;
          }
          return labels.split('\n')[0].replace(',', '');
        });

        await browser.close();

        let hashScoreFormatted = {
          detections: hashScore.split('/')[0],
          engines: hashScore.split('/')[1],
          details: {
            url: page.url(),
          },
        };

        return hashScoreFormatted;

      case 'domain':
        let base64Domain = Buffer.from(value).toString('base64');

        await page.goto(
          `https://metadefender.opswat.com/results/domain/${base64Domain}`
        );

        await page.waitForSelector('.scoreHeader > .score');

        let dominScore = await page.evaluate(() => {
          let text = Array.from(
            document.querySelectorAll('.scoreHeader > .score  > p')
          );
          let labels = text.map((label) => label.innerText).toString();
          if (labels.substring(0, 1) === ',') {
            labels = '0' + labels;
          }
          return labels.split('\n')[0].replace(',', '');
        });

        await browser.close();

        let domainScoreFormatted = {
          detections: dominScore.split('/')[0],
          engines: dominScore.split('/')[1],
          details: {
            url: page.url(),
          },
        };

        return domainScoreFormatted;
    }
  } catch (error) {
    console.log(error);
    return 'Error Scraping MetaDefender: ' + error.msg;
  }
};

module.exports = {
  searchMetadefender,
};
