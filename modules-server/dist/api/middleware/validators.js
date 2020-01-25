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
 * Modules
 */
const validateGetModules = (req, res, next) => {
    const schema = joi_1.default.object({
        moduleName: joi_1.default.string().required()
    });
    validate(req, res, next, schema, req.params);
};
exports.validateGetModules = validateGetModules;
const validateGetDeleteModuleById = (req, res, next) => {
    const schema = joi_1.default.object({
        moduleId: joi_1.default.string().required()
    });
    validate(req, res, next, schema, req.params);
};
exports.validateGetDeleteModuleById = validateGetDeleteModuleById;
const validateAddModule = (req, res, next) => {
    const schema = joi_1.default.object({
        // req.body
        name: joi_1.default.string().required(),
        address: joi_1.default.string().required(),
        config: joi_1.default.object({
            routes: joi_1.default.object({})
                .required()
                .unknown(),
            description: joi_1.default.string().required(),
            author: joi_1.default.string().required()
        }).unknown(),
        // req.query
        manual: joi_1.default.boolean()
    });
    validate(req, res, next, schema, Object.assign({}, req.body, req.query));
};
exports.validateAddModule = validateAddModule;
const validateModifyRouteSettings = (req, res, next) => {
    const schema = joi_1.default.object({
        moduleId: joi_1.default.string().required(),
        moduleRouteSettings: joi_1.default.object({})
            .required()
            .unknown()
    });
    validate(req, res, next, schema, Object.assign({}, req.body, req.params));
};
exports.validateModifyRouteSettings = validateModifyRouteSettings;
const validateModifyModuleConfig = (req, res, next) => {
    const schema = joi_1.default.object({
        moduleId: joi_1.default.string().required(),
        moduleConfig: joi_1.default.object({
            routes: joi_1.default.object({})
                .required()
                .unknown(),
            description: joi_1.default.string().required(),
            author: joi_1.default.string().required()
        })
            .required()
            .unknown()
    });
    validate(req, res, next, schema, Object.assign({}, req.body, req.params));
};
exports.validateModifyModuleConfig = validateModifyModuleConfig;
/**
 * Aggregation
 */
const validateStartModuleDataAggregation = (req, res, next) => {
    const schema = joi_1.default.object({}).unknown();
    validate(req, res, next, schema, req.body);
};
exports.validateStartModuleDataAggregation = validateStartModuleDataAggregation;
/**
 * Jobs
 */
const validateAddModifyJob = (req, res, next) => {
    const schema = joi_1.default.object({
        moduleId: joi_1.default.number().required(),
        interval: joi_1.default.number().required(),
        execute: joi_1.default.boolean().required(),
        lastExecuted: joi_1.default.number(),
        running: joi_1.default.boolean()
    });
    validate(req, res, next, schema, req.body);
};
exports.validateAddModifyJob = validateAddModifyJob;
const validateDeleteJob = (req, res, next) => {
    const schema = joi_1.default.object({
        moduleId: joi_1.default.number().required()
    });
    validate(req, res, next, schema, req.params);
};
exports.validateDeleteJob = validateDeleteJob;
const validateGetJobByModuleId = (req, res, next) => {
    const schema = joi_1.default.object({
        moduleId: joi_1.default.number().required()
    });
    validate(req, res, next, schema, req.params);
};
exports.validateGetJobByModuleId = validateGetJobByModuleId;
