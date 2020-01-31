const helmet = require("helmet");
const uuidv4 = require("uuid/v4");

module.exports = function csp(app) {
  let scriptSrc = ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"];
  // In dev we allow 'unsafe-eval', so HMR doesn't trigger the CSP
  if (process.env.NODE_ENV !== "production") {
    scriptSrc.push("'unsafe-eval'");
  }

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          baseUri: ["'none'"],
          objectSrc: ["'none'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          scriptSrc: scriptSrc,
          defaultSrc: ["'none'"],
          upgradeInsecureRequests: true,
          connectSrc: ["'self'", `https://*.${process.env.SERVER_HOST}`],
          frameAncestors: ["'none'"],
          formAction: ["'self'"],
          imgSrc: ["'self'"]
        }
      },
      referrerPolicy: { policy: "same-origin" }
      //featurePolicy: {}
    })
  );
};
