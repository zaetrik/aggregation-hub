const LRUCache = require("lru-cache");
const CronJob = require("cron").CronJob;

const ssrCache = new LRUCache({
  max:
    100 *
    1024 *
    1024 /* cache size will be 100 MB using `return n.length` as length() function */,
  length: function(n, key) {
    return n.length;
  },
  maxAge: 1000 * 60 * 60 * 23.9 // 24 hours
});

// clear cache 1h after data aggregation
const resetCacheCron = new CronJob("00 30 01 * * 0-6", function() {
  const date = new Date();
  const timestamp = date.getTime();
  console.log("RESET CACHE, time: ", timestamp);
  ssrCache.reset();
});

resetCacheCron.start();

function getCacheKey(req) {
  return `${req.path}`;
}

module.exports = async function renderAndCache(app, req, res) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader("x-cache", "HIT");
    res.send(ssrCache.get(key));
    return;
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, req.path, req.query);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200 && res.statusCode !== 304) {
      res.send(html);
      return;
    }

    // Let's cache this page
    ssrCache.set(key, html);

    res.setHeader("x-cache", "MISS");
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, req.path, req.query);
  }
};
