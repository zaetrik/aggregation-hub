import Joi from "@hapi/joi";
import httpStatus from "http-status";
import * as JoiTypes from "joi";
import logger from "../../utils/logger";
import { Request, Response } from "express";

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

  validate(req, res, next, schema, { ...req.params, ...req.query });
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

  validate(req, res, next, schema, { ...req.body, ...req.query });
};

const validateModifyRouteSettings = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    moduleId: Joi.string().required(),
    moduleRouteSettings: Joi.object({})
      .required()
      .unknown()
  });

  validate(req, res, next, schema, { ...req.body, ...req.params });
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

  validate(req, res, next, schema, { ...req.body, ...req.params });
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
  validateGetJobByModuleId
};
