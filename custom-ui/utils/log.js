const morgan = require("morgan");
const morganJson = require("morgan-json");
const fs = require("fs");

module.exports = function log(server) {
  const logFormat = morganJson({
    short: ":method :url :status",
    status: ":status",
    remoteAddress: ":remote-addr",
    remoteUser: ":remote-user",
    date: ":date[web]",
    method: ":method",
    url: ":url",
    referrer: ":referrer",
    userAgent: ":user-agent"
  });

  server.use(
    morgan(logFormat, {
      stream: fs.createWriteStream("./logs/logs.json", { flags: "a" })
    })
  );

  /*server.use(
    morgan(
      `:remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`
    )
  );*/
};
