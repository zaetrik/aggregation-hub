import httpStatus from "http-status";
import express from "express";
import logger from "../utils/logger";

// VALIDATORS
import {
  validateCreateDeleteIndex,
  validateGetDocumentCountGetMappingFromIndex
} from "./middleware/validators";

// repository is used to pass different DB functions (e.g. testDbAbstraction)
export = (app: express.Application, repository: Repository) => {
  /**
   * INDEX ROUTES
   */

  app.post(
    "/index/create/:moduleId",
    validateCreateDeleteIndex,
    async (req, res) => {
      try {
        const createIndexOperation: CreateDeleteIndexResponse = await repository.createIndex(
          req.params.moduleId
        );

        res.status(httpStatus.OK).send(createIndexOperation);
      } catch (err) {
        if (err.message === "resource_already_exists_exception") {
          res.sendStatus(httpStatus.NOT_MODIFIED);
        } else {
          logger.log("error", err, { route: req.originalUrl });
          res.sendStatus(httpStatus.BAD_REQUEST);
        }
      }
    }
  );

  app.delete(
    "/index/delete/:moduleId",
    validateCreateDeleteIndex,
    async (req, res) => {
      try {
        const deleteIndexOperation: CreateDeleteIndexResponse = await repository.deleteIndex(
          req.params.moduleId
        );
        res.status(httpStatus.OK).send(deleteIndexOperation);
      } catch (err) {
        if (err.message === "index_not_found_exception") {
          res.sendStatus(httpStatus.NOT_MODIFIED);
        } else {
          logger.log("error", err, { route: req.originalUrl });
          res.sendStatus(httpStatus.BAD_REQUEST);
        }
      }
    }
  );

  app.get(
    "/index/count/:moduleId",
    validateGetDocumentCountGetMappingFromIndex,
    async (req, res) => {
      try {
        const getDocumentCountOperation: {
          status: number;
          count: number;
        } = await repository.getDocumentCountFromIndex(req.params.moduleId);

        res.status(httpStatus.OK).send(getDocumentCountOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.get(
    "/index/mapping/:moduleId",
    validateGetDocumentCountGetMappingFromIndex,
    async (req, res) => {
      try {
        const getMappingOperation: {
          status: number;
          mapping: object;
        } = await repository.getMappingFromIndex(req.params.moduleId);

        res.status(httpStatus.OK).send(getMappingOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );
};
