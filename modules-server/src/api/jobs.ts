import httpStatus from "http-status";
import express, { Request, Response } from "express";
import logger from "../utils/logger";
import { Repository } from "repository";
import {
  GetJobsResponse,
  AddModifyJobResponse,
  DeleteJobResponse
} from "responses";
import {
  validateAddModifyJob,
  validateDeleteJob,
  validateGetJobByModuleId
} from "./middleware/validators";

// repository is used to pass different DB functions (e.g. testDbAbstraction)
export = (app: express.Application, repository: Repository) => {
  app.post(
    "/jobs",
    validateAddModifyJob,
    async (req: Request, res: Response) => {
      try {
        const addNewJobOperation: AddModifyJobResponse = await repository.addJob(
          req.body
        );

        return res.send(addNewJobOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.post(
    "/jobs/update",
    validateAddModifyJob,
    async (req: Request, res: Response) => {
      try {
        const updateJobOperation: AddModifyJobResponse = await repository.updateJob(
          req.body
        );

        return res.send(updateJobOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.delete(
    "/jobs/id/:moduleId",
    validateDeleteJob,
    async (req: Request, res: Response) => {
      try {
        const deleteJobByModuleIdOperation: DeleteJobResponse = await repository.deleteJobByModuleId(
          req.params.moduleId
        );
        return res.send(deleteJobByModuleIdOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.get("/jobs", async (req: Request, res: Response) => {
    try {
      const getAllJobsOperation: GetJobsResponse = await repository.getAllJobs();

      return res.send(getAllJobsOperation);
    } catch (err) {
      logger.log("error", err, { route: req.originalUrl });
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  });

  app.get(
    "/jobs/id/:moduleId",
    validateGetJobByModuleId,
    async (req: Request, res: Response) => {
      try {
        const getJobByModuleIdOperation: GetJobsResponse = await repository.getJobByModuleId(
          req.params.moduleId
        );

        return res.send(getJobByModuleIdOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );
};
