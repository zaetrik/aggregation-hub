import express from "express";
import fs from "fs";
import cors from "cors";
import morgan from "morgan";
import morganJson from "morgan-json";
import helmet from "helmet";
import { serverSettings } from "../config/config";
import modulesAPI from "../api/modules";
import moduleCommunicationAPI from "../api/moduleCommunication";
import dashboardsAPI from "../api/dashboards";
import jobsAPI from "../api/jobs";
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
      logger.log("error", err);
      reject(new Error("Something went wrong!, err:" + err));
      res.status(500).send("Something went wrong!");
    });

    // we add our API's to the express app
    modulesAPI(app, repositoryConnection);
    moduleCommunicationAPI(app, repositoryConnection);
    jobsAPI(app, repositoryConnection);
    dashboardsAPI(app, repositoryConnection);

    // finally we start the server, and return the newly created server
    const server = app.listen(serverSettings.port, () => resolve(server));
  });
};

export { start };
