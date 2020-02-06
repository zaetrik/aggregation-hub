import Joi from "@hapi/joi";
import httpStatus from "http-status";
import * as JoiTypes from "joi";
import logger from "../../utils/logger";
import { Request, Response } from "express";
import deepmerge from "deepmerge";

const validate = (
  req: Request,
  res: Response,
  next,
  schema: JoiTypes.Schema,
  dataToValidate: any
) => {
  const schemaValidation = schema.validate(dataToValidate);

  if (!schemaValidation.error) {
    next();
  } else {
    logger.log(
      "info",
      "Could not validate query: " + JSON.stringify(schemaValidation),
      { route: req.originalUrl }
    );

    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};

/**
 * Modules
 */

const validateGetModules = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    moduleName: Joi.string().required()
  });

  validate(req, res, next, schema, req.params);
};

const validateDeleteModuleById = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    moduleId: Joi.string().required(),
    deleteData: Joi.boolean()
  });

  validate(req, res, next, schema, deepmerge(req.params, req.query));
};

const validateGetModuleById = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    moduleId: Joi.string().required()
  });

  validate(req, res, next, schema, req.params);
};

const validateAddModule = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    // req.body
    name: Joi.string().required(),
    address: Joi.string().required(),
    config: Joi.object({
      routes: Joi.object({})
        .required()
        .unknown(),
      description: Joi.string().required(),
      author: Joi.string().required()
    }).unknown(),
    // req.query
    manual: Joi.boolean()
  });
  validate(req, res, next, schema, deepmerge(req.query, req.body));
};

const validateModifyRouteSettings = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    moduleId: Joi.string().required(),
    moduleRouteSettings: Joi.object({})
      .required()
      .unknown()
  });

  validate(req, res, next, schema, deepmerge(req.params, req.body));
};

const validateModifyModuleConfig = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    moduleId: Joi.string().required(),
    moduleConfig: Joi.object({
      routes: Joi.object({})
        .required()
        .unknown(),
      description: Joi.string().required(),
      author: Joi.string().required()
    })
      .required()
      .unknown()
  });

  validate(req, res, next, schema, deepmerge(req.params, req.body));
};

/**
 * Aggregation
 */
const validateStartModuleDataAggregation = (
  req: Request,
  res: Response,
  next
) => {
  const schema: JoiTypes.Schema = Joi.object({}).unknown();

  validate(req, res, next, schema, req.body);
};

/**
 * Jobs
 */
const validateAddModifyJob = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    moduleId: Joi.number().required(),
    interval: Joi.number().required(),
    execute: Joi.boolean().required(),
    lastExecuted: Joi.number(),
    running: Joi.boolean()
  });

  validate(req, res, next, schema, req.body);
};

const validateDeleteJob = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    moduleId: Joi.number().required()
  });

  validate(req, res, next, schema, req.params);
};

const validateGetJobByModuleId = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    moduleId: Joi.number().required()
  });

  validate(req, res, next, schema, req.params);
};

// Dashboards

const validateModifyDashboard = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    // Params
    dashboardId: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .required(),

    // Body
    name: Joi.string().required(),
    moduleId: Joi.alternatives().try(Joi.string(), Joi.number()), // only needed, if the dashboard is set for a specific module
    components: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          chartHeading: Joi.string(),
          chartSubHeading: Joi.string(),
          searchQueries: Joi.array()
            .items(
              Joi.object({
                moduleIds: Joi.array()
                  .items(Joi.string())
                  .required(),
                size: Joi.number().required(),
                query: Joi.object()
                  .unknown()
                  .required()
              })
            )
            .required()
        })
      )
      .required()
  });

  validate(req, res, next, schema, deepmerge(req.params, req.body));
};

const validateModifyDashboardByModuleId = (
  req: Request,
  res: Response,
  next
) => {
  const schema: JoiTypes.Schema = Joi.object({
    params: Joi.object({
      moduleId: Joi.alternatives()
        .try(Joi.string(), Joi.number())
        .required()
    }).required(),
    body: Joi.object({
      name: Joi.string().required(),
      moduleId: Joi.alternatives()
        .try(Joi.string(), Joi.number())
        .required(), // only needed, if the dashboard is set for a specific module
      components: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            chartHeading: Joi.string(),
            chartSubHeading: Joi.string(),
            searchQueries: Joi.array()
              .items(
                Joi.object({
                  moduleIds: Joi.array()
                    .items(Joi.string())
                    .required(),
                  size: Joi.number().required(),
                  query: Joi.object()
                    .unknown()
                    .required()
                })
              )
              .required()
          })
        )
        .required()
    }).required()
  });

  validate(req, res, next, schema, { params: req.params, body: req.body });
};

const validateAddDashboard = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    name: Joi.string().required(),
    moduleId: Joi.alternatives().try(Joi.string(), Joi.number()), // only needed, if the dashboard is set for a specific module
    components: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          searchQueries: Joi.array()
            .items(
              Joi.object({
                moduleIds: Joi.array()
                  .items(Joi.string())
                  .required(),
                size: Joi.number().required(),
                query: Joi.object()
                  .unknown()
                  .required()
              })
            )
            .required()
        })
      )
      .required()
  });

  validate(req, res, next, schema, req.body);
};

const validateGetDeleteDashboardById = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    dashboardId: Joi.string().required()
  });

  validate(req, res, next, schema, req.params);
};

const validateGetDeleteDashboardByModuleId = (
  req: Request,
  res: Response,
  next
) => {
  const schema: JoiTypes.Schema = Joi.object({
    moduleId: Joi.string().required()
  });

  validate(req, res, next, schema, req.params);
};

export {
  validateGetModules,
  validateAddModule,
  validateGetModuleById,
  validateDeleteModuleById,
  validateModifyRouteSettings,
  validateModifyModuleConfig,
  validateStartModuleDataAggregation,
  validateAddModifyJob,
  validateDeleteJob,
  validateGetJobByModuleId,
  validateAddDashboard,
  validateModifyDashboard,
  validateGetDeleteDashboardById,
  validateGetDeleteDashboardByModuleId,
  validateModifyDashboardByModuleId
};
