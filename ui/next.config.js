const withCSS = require("@zeit/next-css");
module.exports = withCSS({
  /* config options here */
  poweredByHeader: false,
  env: {
    SERVER_HOST: "",
    MODULES_SERVICE_DEV: "http://localhost:3004",
    MODULES_SERVICE_PROD: "http://localhost:3004",
    STORE_SERVICE_DEV: "http://localhost:3003",
    STORE_SERVICE_PROD: "http://localhost:3003"
  }
});
