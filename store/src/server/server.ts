import express from "express";
import fs from "fs";
import morgan from "morgan";
import morganJson from "morgan-json";
import helmet from "helmet";
import cors from "cors";
import documentAPI from "../api/document";
import indexAPI from "../api/index";
import queryAPI from "../api/query";
import { serverSettings } from "../config/config";
import logger from "../utils/logger";

const start = (repositoryConnection): Promise<express.Application> => {
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

    app.use(cors());

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
      logger.log("error", "Error in server.ts error handler: " + err);
      reject(new Error("Something went wrong!, err:" + err));
      res.status(500).send("Something went wrong!");
    });

    // we add our API's to the express app
    documentAPI(app, repositoryConnection);
    indexAPI(app, repositoryConnection);
    queryAPI(app, repositoryConnection);

    // finally we start the server, and return the newly created server
    const server = app.listen(serverSettings.port, () => resolve(server));
  });
};

export { start };
