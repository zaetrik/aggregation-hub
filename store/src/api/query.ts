import httpStatus from "http-status";
import express, { Request, Response } from "express";
import { validateQueryAll, validateQuery } from "./middleware/validators";
import logger from "../utils/logger";

// repository is used to pass different DB functions (e.g. testDbAbstraction)
export = (app: express.Application, repository: Repository) => {
  app.get(
    "/query/all",
    validateQueryAll,
    async (req: Request, res: Response) => {
      try {
        const queryAllOperation: {
          status: number;
          data: object[];
        } = await repository.queryAllFromIndex(
          req.query.moduleId,
          req.query.start
        );

        return res.status(httpStatus.OK).send(queryAllOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.get("/query", validateQuery, async (req: Request, res: Response) => {
    try {
      const queryOperation: {
        status: number;
        data: object[];
      } = await repository.query(
        req.body.moduleIds,
        req.body.size,
        req.body.start,
        req.body.query
      );

      return res.status(httpStatus.OK).send(queryOperation);
    } catch (err) {
      logger.log("error", err, { route: req.originalUrl });
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  });
};
