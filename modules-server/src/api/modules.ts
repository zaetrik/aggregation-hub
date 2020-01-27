import httpStatus from "http-status";
import express, { Request, Response } from "express";
import logger from "../utils/logger";
import { Repository } from "repository";
import {
  validateAddModule,
  validateGetModules,
  validateGetModuleById,
  validateDeleteModuleById,
  validateModifyRouteSettings,
  validateModifyModuleConfig
} from "./middleware/validators";
import {
  InsertDeleteModuleResponse,
  GetModulesResponse,
  DeleteJobResponse
} from "responses";
import axios from "axios";

// repository is used to pass different DB functions (e.g. testDbAbstraction)
export = (app: express.Application, repository: Repository) => {
  app.get(
    "/modules/id/:moduleId",
    validateGetModuleById,
    async (req: Request, res: Response) => {
      try {
        const getModuleByIdOperation: GetModulesResponse = await repository.getModuleById(
          req.params.moduleId
        );
        return res.send(getModuleByIdOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.delete(
    "/modules/id/:moduleId",
    validateDeleteModuleById,
    async (req: Request, res: Response) => {
      try {
        const deleteModuleByIdOperation: InsertDeleteModuleResponse = await repository.deleteModuleById(
          req.params.moduleId
        );
        const deleteJobsFromModuleOperation: DeleteJobResponse = await repository.deleteJobByModuleId(
          req.params.moduleId
        );

        const deleteData: boolean = req.query.deleteData || false;
        if (deleteData) {
          await axios.delete(
            `${process.env.DATA_STORE_URL}/index/delete/${req.params.moduleId}`
          );
        }

        return res.send(deleteModuleByIdOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.get(
    "/modules/:moduleName",
    validateGetModules,
    async (req: Request, res: Response) => {
      try {
        const getModulesOperation: GetModulesResponse = await repository.getModules(
          req.params.moduleName
        );
        return res.send(getModulesOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.get("/modules", async (req: Request, res: Response) => {
    try {
      const getAllModulesOperation: GetModulesResponse = await repository.getAllModules();
      return res.send(getAllModulesOperation);
    } catch (err) {
      logger.log("error", err, { route: req.originalUrl });
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  });

  app.post(
    "/modules",
    validateAddModule,
    async (req: Request, res: Response) => {
      try {
        if (req.query.manual) {
          const addModuleOperationManual: InsertDeleteModuleResponse = await repository.addModuleManual(
            req.body
          );
          return res.send(addModuleOperationManual);
        } else {
          const addModuleOperation: InsertDeleteModuleResponse = await repository.addModule(
            req.body
          );
          return res.send(addModuleOperation);
        }
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.post(
    "/modules/id/:moduleId/routeSettings",
    validateModifyRouteSettings,
    async (req: Request, res: Response) => {
      try {
        const modifyRouteSettingsOperation: {
          status: number;
        } = await repository.updateModuleRouteSettings(
          req.params.moduleId,
          req.body.moduleRouteSettings
        );
        return res.send(modifyRouteSettingsOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.get(
    "/modules/id/:moduleId/routeSettings",
    async (req: Request, res: Response) => {
      try {
        const getModuleRouteSettingsOperation: {
          status: number;
          routeSettings: ModuleRouteSettings;
        } = await repository.getModuleRouteSettings(req.params.moduleId);

        res.status(httpStatus.OK).send(getModuleRouteSettingsOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );

  app.post(
    "/modules/id/:moduleId/config",
    validateModifyModuleConfig,
    async (req: Request, res: Response) => {
      try {
        const modifyModuleConfigOperation: {
          status: number;
        } = await repository.updateModuleConfig(
          req.params.moduleId,
          req.body.moduleConfig
        );

        /**
         * Creating new moduleRouteSettings with old values
         * Needed for UI form generation
         */
        const getCurrentModuleRouteSettingsOperation: {
          status: number;
          routeSettings: ModuleRouteSettings;
        } = await repository.getModuleRouteSettings(req.params.moduleId);

        const generatedModuleRouteSettings = getCurrentModuleRouteSettingsOperation
          .routeSettings.routeSettings
          ? Object.keys(req.body.moduleConfig.routes).map(route => {
              return {
                [route]: {
                  method: req.body.moduleConfig.routes[route].method,
                  bodyParams: getCurrentModuleRouteSettingsOperation
                    .routeSettings.routeSettings[route]
                    ? getCurrentModuleRouteSettingsOperation.routeSettings
                        .routeSettings[route].bodyParams
                    : {},
                  queryParams: getCurrentModuleRouteSettingsOperation
                    .routeSettings.routeSettings[route]
                    ? getCurrentModuleRouteSettingsOperation.routeSettings
                        .routeSettings[route].queryParams
                    : {}
                }
              };
            })
          : Object.keys(req.body.moduleConfig.routes).map(route => {
              return {
                [route]: {
                  method: req.body.moduleConfig.routes[route].method,
                  bodyParams: {},
                  queryParams: {}
                }
              };
            });

        const newModuleRouteSettings: ModuleRouteSettings = Object.assign(
          {},
          ...generatedModuleRouteSettings
        );
        console.log(newModuleRouteSettings);

        const updateModuleRouteSettings: {
          status: number;
        } = await repository.updateModuleRouteSettings(
          req.params.moduleId,
          newModuleRouteSettings
        );

        return res.send(modifyModuleConfigOperation);
      } catch (err) {
        logger.log("error", err, { route: req.originalUrl });
        res.sendStatus(httpStatus.BAD_REQUEST);
      }
    }
  );
};
