const defaultTimeout = { timeout: 5000 };

const getRisk = async (page) => {
  await page.waitForSelector('.scorebackgroundfilter', defaultTimeout);

  let scoreClass = await page.$('.scorebackgroundfilter');
  let score = await (await scoreClass.getProperty('innerText')).jsonValue();

  return score;
};

const getTableDetails = async (page) => {
  await page.waitForSelector('.detailsline', defaultTimeout);
  const tableData = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll('.detailsline tr td'));
    return tds.map((td) => td.innerText);
  });

  return tableData;
};

const searchXForce = async (page, searchType, value) => {
  try {
    await page.setViewport({ width: 1366, height: 768 });

    switch (searchType) {
      case 'ip':
        await page.goto(`https://exchange.xforce.ibmcloud.com/ip/${value}`);

        let ipRisk = await getRisk(page);
        let ipDetails = await getTableDetails(page);

        let ipResults = {
          risk: ipRisk,
          details: {
            url: page.url(),
            category: ipDetails[0],
          },
        };

        return ipResults;

      case 'domain':
        await page.goto(`https://exchange.xforce.ibmcloud.com/url/${value}`);

        let urlRisk = await getRisk(page);
        let urlDetails = await getTableDetails(page);

        let urlResults = {
          risk: urlRisk,
          details: {
            url: page.url(),
            category: urlDetails[0],
          },
        };

        return urlResults;

      case 'hash':
        let hashResults = {};
        await page.goto(
          `https://exchange.xforce.ibmcloud.com/malware/${value}`
        );

        let score = await getRisk(page);

        if (score.toLowerCase() !== 'low') {
          const tableData = await page.evaluate(() => {
            const tds = Array.from(
              document.querySelectorAll('.detailsline tr td')
            );
            return tds.map((td) => td.innerText);
          });

          hashResults = {
            risk: score,
            details: {
              url: page.url(),
              family: tableData[3],
              first_seen: tableData[1],
              type: tableData[4],
            },
          };
        } else {
          hashResults = {
            risk: score,
            details: {
              url: page.url(),
            },
          };
        }

        return hashResults;

      default:
        break;
    }
  } catch (err) {
    console.error(err);
    return { error: 'Error Scraping X-Force' };
  }
};
module.exports = {
  searchXForce,
};
