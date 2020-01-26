const express = require("express");
const next = require("next");
const hpp = require("hpp");
const expressContentLengthValidator = require("express-content-length-validator");
const csp = require("./utils/csp");
const log = require("./utils/log");
const renderAndCache = require("./utils/renderAndCache");

const port = parseInt(process.env.PORT, 10) || 3001;
console.log(process.env.NODE_ENV);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const MAX_CONTENT_LENGTH_ACCEPTED = 9999;

app.prepare().then(() => {
  const server = express();

  //csp(server);

  log(server);

  server.use(
    expressContentLengthValidator.validateMax({
      max: MAX_CONTENT_LENGTH_ACCEPTED,
      status: 400,
      message: "Invalid payload; too big."
    })
  );

  server.use(hpp());

  server.get("/_next/*", (req, res) => {
    /* serving _next content using next.js handler */
    handle(req, res);
  });

  server.get("/styles/*", (req, res) => {
    /* serving styles content using next.js handler */
    handle(req, res);
  });

  server.get("/assets/*", (req, res) => {
    /* serving assets content using next.js handler */
    handle(req, res);
  });

  server.get("*", (req, res) => {
    /* serving page */
    return renderAndCache(app, req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on port ${port}`);
  });
});
