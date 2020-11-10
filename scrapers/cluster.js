const { Cluster } = require('puppeteer-cluster');

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
  });

  const metaDefender = async ({ page, data }) => {
    await page.goto(url);
    const path = url.replace(/[^a-zA-Z]/g, '_') + '.png';
    await page.screenshot({ path });
  };

  cluster.queue('http://www.google.com/');
  cluster.queue('http://www.wikipedia.org/');
  // many more pages

  await cluster.idle();
  await cluster.close();
})();
