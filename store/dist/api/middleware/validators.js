"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const http_status_1 = __importDefault(require("http-status"));
const logger_1 = __importDefault(require("../../utils/logger"));
const validate = (req, res, next, schema, dataToValidate) => {
    const schemaValidation = schema.validate(dataToValidate);
    if (!schemaValidation.error) {
        next();
    }
    else {
        logger_1.default.log("info", "Could not validate query: " + JSON.stringify(schemaValidation), { route: req.originalUrl });
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
};
/**
 * Document API
 */
const validateInsertDocument = (req, res, next) => {
    const schema = joi_1.default.object({
        moduleId: joi_1.default.number().required(),
        data: joi_1.default.object().required()
    });
    validate(req, res, next, schema, req.body);
};
exports.validateInsertDocument = validateInsertDocument;
const validateUpdateDocument = (req, res, next) => {
    const schema = joi_1.default.object({
        moduleId: joi_1.default.number().required(),
        id: joi_1.default.string().required(),
        data: joi_1.default.object().required()
    });
    validate(req, res, next, schema, req.body);
};
exports.validateUpdateDocument = validateUpdateDocument;
const validateDeleteDocument = (req, res, next) => {
    const schema = joi_1.default.object({
        moduleId: joi_1.default.number().required(),
        id: joi_1.default.string().required()
    });
    validate(req, res, next, schema, req.body);
};
exports.validateDeleteDocument = validateDeleteDocument;
/**
 * Index API
 */
const validateCreateDeleteIndex = (req, res, next) => {
    const schema = joi_1.default.object({
        moduleId: joi_1.default.number().required()
    });
    validate(req, res, next, schema, req.params);
};
exports.validateCreateDeleteIndex = validateCreateDeleteIndex;
const validateGetDocumentCountGetMappingFromIndex = (req, res, next) => {
    const schema = joi_1.default.object({
        moduleId: joi_1.default.number().required()
    });
    validate(req, res, next, schema, req.params);
};
exports.validateGetDocumentCountGetMappingFromIndex = validateGetDocumentCountGetMappingFromIndex;
/**
 * Query API
 */
const validateQueryAll = (req, res, next) => {
    const schema = joi_1.default.object({
        moduleId: joi_1.default.number().required(),
        start: joi_1.default.number()
    });
    validate(req, res, next, schema, req.query);
};
exports.validateQueryAll = validateQueryAll;
const validateQuery = (req, res, next) => {
    const schema = joi_1.default.object({
        moduleIds: joi_1.default.array()
            .items(joi_1.default.string())
            .required(),
        size: joi_1.default.number(),
        start: joi_1.default.number(),
        query: joi_1.default.object()
            .unknown()
            .required()
    });
    validate(req, res, next, schema, req.body);
};
exports.validateQuery = validateQuery;
