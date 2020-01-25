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

const validateInsertDocument = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    index: Joi.number().required(),
    data: Joi.object().required()
  });

  validate(req, res, next, schema, req.body);
};

const validateUpdateDocument = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    index: Joi.number().required(),
    id: Joi.string().required(),
    data: Joi.object().required()
  });

  validate(req, res, next, schema, req.body);
};

const validateDeleteDocument = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    index: Joi.number().required(),
    id: Joi.string().required()
  });

  validate(req, res, next, schema, req.body);
};

const validateCreateDeleteIndex = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    index: Joi.number().required()
  });

  validate(req, res, next, schema, req.body);
};

const validateGetDocumentCountGetMappingFromIndex = (
  req: Request,
  res: Response,
  next
) => {
  const schema: JoiTypes.Schema = Joi.object({
    index: Joi.number().required()
  });

  validate(req, res, next, schema, req.params);
};

const validateQueryAll = (req: Request, res: Response, next) => {
  const schema: JoiTypes.Schema = Joi.object({
    index: Joi.number().required(),
    start: Joi.number()
  });

  validate(req, res, next, schema, req.query);
};

export {
  validateInsertDocument,
  validateUpdateDocument,
  validateDeleteDocument,
  validateCreateDeleteIndex,
  validateGetDocumentCountGetMappingFromIndex,
  validateQueryAll
};
