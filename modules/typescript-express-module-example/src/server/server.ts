import express from "express";
import fs from "fs";
import morgan from "morgan";
import morganJson from "morgan-json";
import helmet from "helmet";
import API from "../api/api";
import logger from "../utils/logger";

const start = (serverSettings): Promise<express.Application> => {
  return new Promise((resolve, reject) => {
    const app: express.Application = express();

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

    app.use(
      morgan(logFormat, {
        stream: fs.createWriteStream("./logs/accessLogs.json", {
          flags: "a"
        })
      })
    );

    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'none'"],
            styleSrc: ["'self'"],
            scriptSrc: ["'self'"],
            //reportUri: "/",
            objectSrc: ["'self'"],
            upgradeInsecureRequests: true,
            frameAncestors: ["'none'"]
          }
        },
        referrerPolicy: { policy: "same-origin" }
        //featurePolicy: {}
      })
    );
    app.use(express.json());

    app.use((err, req, res, next) => {
      logger.log("error", err);
      reject(new Error("Something went wrong!, err:" + err));
      res.status(500).send("Something went wrong!");
    });

    // we add our API's to the express app
    API(app);

    // finally we start the server, and return the newly created server
    const server = app.listen(serverSettings.port, () => resolve(server));
  });
};

export { start };
