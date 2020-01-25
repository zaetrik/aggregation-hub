import httpStatus from "http-status";
import express, { Request, Response } from "express";
import { validateQueryAll } from "./middleware/validators";
import logger from "../utils/logger";

// repository is used to pass different DB functions (e.g. testDbAbstraction)
export = (app: express.Application, repository: Repository) => {
  app.get("/query", async (req: Request, res: Response) => {});

  app.get(
    "/query/all",
    validateQueryAll,
    async (req: Request, res: Response) => {
      try {
        const queryAllOperation: {
          status: number;
          data: object[];
        } = await repository.queryAllFromIndex(
          req.query.index,
          req.query.start
        );

        return res.status(httpStatus.OK).send(queryAllOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );
};
