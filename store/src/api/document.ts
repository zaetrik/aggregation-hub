import httpStatus from "http-status";
import express from "express";
import logger from "../utils/logger";

// VALIDATORS
import {
  validateInsertDocument,
  validateUpdateDocument,
  validateDeleteDocument
} from "./middleware/validators";

// repository is used to pass different DB functions (e.g. testDbAbstraction)
export = (app: express.Application, repository: Repository) => {
  /**
   * DOCUMENT ROUTES
   */

  app.post("/document/insert", validateInsertDocument, async (req, res) => {
    try {
      const insertOperation: InsertUpdateDocumentResponse = await repository.insertDocument(
        req.body
      );
      res.status(httpStatus.OK).send(insertOperation);
    } catch (err) {
      if (err.message === "index_not_found_exception") {
        res
          .status(httpStatus.BAD_REQUEST)
          .send(`INDEX ${req.body.index} DOES NOT EXIST`);
      } else {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  });

  app.post("/document/update", validateUpdateDocument, async (req, res) => {
    try {
      const updateOperation: InsertUpdateDocumentResponse = await repository.updateDocument(
        req.body
      );
      res.status(httpStatus.OK).send(updateOperation);
    } catch (err) {
      if (err.message === "index_not_found_exception") {
        res
          .status(httpStatus.BAD_REQUEST)
          .send(`INDEX ${req.body.index} DOES NOT EXIST`);
      } else {
        if (err.message === "document_missing_exception") {
          res
            .status(httpStatus.BAD_REQUEST)
            .send(
              `DOCUMENT ${req.body.id} DOES NOT EXIST IN INDEX ${req.body.index}`
            );
        } else {
          logger.log("error", err, { route: req.originalUrl });
          res.sendStatus(httpStatus.BAD_REQUEST);
        }
      }
    }
  });

  app.delete("/document/delete", validateDeleteDocument, async (req, res) => {
    try {
      const deleteOperation: DeleteDocumentResponse = await repository.deleteDocument(
        req.body
      );
      res.status(httpStatus.OK).send(deleteOperation);
    } catch (err) {
      if (err.message === "document_not_found") {
        res
          .status(httpStatus.BAD_REQUEST)
          .send(
            `DOCUMENT ${req.body.id} DOES NOT EXIST IN INDEX ${req.body.index}`
          );
      } else {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  });
};
