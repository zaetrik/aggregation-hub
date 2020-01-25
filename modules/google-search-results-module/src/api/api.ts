import httpStatus from "http-status";
import express from "express";
import * as scraper from "../scraper/scraper";
import logger from "../utils/logger";
import path from "path";

// repository is used to pass different DB functions (e.g. testDbAbstraction)
export = (app: express.Application) => {
  app.post("/start", async (req, res) => {
    try {
      scraper
        .startAggregation(
          req.body.dataStoreUrl,
          req.body.searchQueries,
          req.body.moduleId
        )
        .then(() => {
          scraper.stopAggregation(req.body.moduleServiceUrl, req.body.moduleId);
        });

      return res.sendStatus(httpStatus.OK);
    } catch (err) {
      logger.log("error", err, { route: req.originalUrl });
      scraper.stopAggregation(req.body.moduleServiceUrl, req.body.moduleId);
    }
  });

  app.get("/config", async (req, res) => {
    try {
      return res.status(httpStatus.OK).sendFile(path.resolve("./config.json"));
    } catch (err) {
      logger.log("error", err, { route: req.originalUrl });
    }
  });
};
