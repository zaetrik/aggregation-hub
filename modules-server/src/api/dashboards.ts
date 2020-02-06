import httpStatus from "http-status";
import express, { Request, Response } from "express";
import logger from "../utils/logger";
import { Repository } from "repository";
import {
  validateAddDashboard,
  validateModifyDashboard,
  validateGetDeleteDashboardById,
  validateGetDeleteDashboardByModuleId,
  validateModifyDashboardByModuleId
} from "./middleware/validators";
import {
  AddModifyDashboardResponse,
  DeleteDashboardResponse,
  GetDashboardsResponse
} from "responses";

// repository is used to pass different DB functions (e.g. testDbAbstraction)
export = (app: express.Application, repository: Repository) => {
  app.post(
    "/dashboards",
    validateAddDashboard,
    async (req: Request, res: Response) => {
      try {
        const addNewDashboardOperation: AddModifyDashboardResponse = await repository.addDashboard(
          req.body
        );

        return res.send(addNewDashboardOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.post(
    "/dashboards/id/:dashboardId/update",
    validateModifyDashboard,
    async (req: Request, res: Response) => {
      try {
        const updateDashboardByIdOperation: AddModifyDashboardResponse = await repository.updateDashboardById(
          req.params.dashboardId,
          req.body
        );

        return res.send(updateDashboardByIdOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.post(
    "/dashboards/moduleId/:moduleId/update",
    validateModifyDashboardByModuleId,
    async (req: Request, res: Response) => {
      try {
        const updateDashboardByModuleIdOperation: AddModifyDashboardResponse = await repository.updateDashboardByModuleId(
          req.params.moduleId,
          req.body
        );

        return res.send(updateDashboardByModuleIdOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.delete(
    "/dashboards/id/:dashboardId",
    validateGetDeleteDashboardById,
    async (req: Request, res: Response) => {
      try {
        const deleteDashboardByIdOperation: DeleteDashboardResponse = await repository.deleteDashboardById(
          req.params.dashboardId
        );
        return res.send(deleteDashboardByIdOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.get("/dashboards", async (req: Request, res: Response) => {
    try {
      const getAllDashboardsOperation: GetDashboardsResponse = await repository.getAllDashboards();

      return res.send(getAllDashboardsOperation);
    } catch (err) {
      logger.log("error", err, { route: req.originalUrl });
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  });

  app.get(
    "/dashboards/id/:dashboardId",
    validateGetDeleteDashboardById,
    async (req: Request, res: Response) => {
      try {
        const getDashboardByIdOperation: GetDashboardsResponse = await repository.getDashboardById(
          req.params.dashboardId
        );

        return res.send(getDashboardByIdOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.get(
    "/dashboards/moduleId/:moduleId",
    validateGetDeleteDashboardByModuleId,
    async (req: Request, res: Response) => {
      try {
        const getDashboardByModuleIdOperation: GetDashboardsResponse = await repository.getDashboardByModuleId(
          req.params.moduleId
        );

        return res.send(getDashboardByModuleIdOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.delete(
    "/dashboards/moduleId/:moduleId",
    validateGetDeleteDashboardByModuleId,
    async (req: Request, res: Response) => {
      try {
        const deleteDashboardByModuleIdOperation: DeleteDashboardResponse = await repository.deleteDashboardByModuleId(
          req.params.moduleId
        );

        return res.send(deleteDashboardByModuleIdOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );
};
