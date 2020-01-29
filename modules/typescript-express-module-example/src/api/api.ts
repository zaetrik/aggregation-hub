import httpStatus from "http-status";
import express from "express";
import * as scraper from "../scraper/scraper";
import path from "path";
import logger from "../utils/logger";

export = (app: express.Application) => {
  app.post("/start", async (req, res) => {
    try {
      scraper
        .startAggregation(req.body.dataStoreUrl, req.body.moduleId)
        .then(() => {
          scraper.stopAggregation(req.body.moduleServiceUrl, req.body.moduleId);
        });

      return res.sendStatus(httpStatus.OK);
    } catch (err) {
      scraper.stopAggregation(req.body.moduleServiceUrl, req.body.moduleId);
    }
  });

  app.get("/config", async (req, res) => {
    try {
      return res
        .status(httpStatus.OK)
        .sendFile(path.join(__dirname, "..", "..", "config.json"));
    } catch (err) {
      logger.log("error", err, { route: req.originalUrl });
    }
  });
};
