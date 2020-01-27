"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const http_status_1 = __importDefault(require("http-status"));
const logger_1 = __importDefault(require("../utils/logger"));
const validators_1 = require("./middleware/validators");
const axios_1 = __importDefault(require("axios"));
module.exports = (app, repository) => {
    app.get("/modules/id/:moduleId", validators_1.validateGetModuleById, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const getModuleByIdOperation = yield repository.getModuleById(req.params.moduleId);
            return res.send(getModuleByIdOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.delete("/modules/id/:moduleId", validators_1.validateDeleteModuleById, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteModuleByIdOperation = yield repository.deleteModuleById(req.params.moduleId);
            const deleteJobsFromModuleOperation = yield repository.deleteJobByModuleId(req.params.moduleId);
            const deleteData = req.query.deleteData || false;
            if (deleteData) {
                yield axios_1.default.delete(`${process.env.DATA_STORE_URL}/index/delete/${req.params.moduleId}`);
            }
            return res.send(deleteModuleByIdOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.get("/modules/:moduleName", validators_1.validateGetModules, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const getModulesOperation = yield repository.getModules(req.params.moduleName);
            return res.send(getModulesOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.get("/modules", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const getAllModulesOperation = yield repository.getAllModules();
            return res.send(getAllModulesOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.post("/modules", validators_1.validateAddModule, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.query.manual) {
                const addModuleOperationManual = yield repository.addModuleManual(req.body);
                return res.send(addModuleOperationManual);
            }
            else {
                const addModuleOperation = yield repository.addModule(req.body);
                return res.send(addModuleOperation);
            }
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.post("/modules/id/:moduleId/routeSettings", validators_1.validateModifyRouteSettings, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const modifyRouteSettingsOperation = yield repository.updateModuleRouteSettings(req.params.moduleId, req.body.moduleRouteSettings);
            return res.send(modifyRouteSettingsOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.get("/modules/id/:moduleId/routeSettings", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const getModuleRouteSettingsOperation = yield repository.getModuleRouteSettings(req.params.moduleId);
            res.status(http_status_1.default.OK).send(getModuleRouteSettingsOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.post("/modules/id/:moduleId/config", validators_1.validateModifyModuleConfig, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const modifyModuleConfigOperation = yield repository.updateModuleConfig(req.params.moduleId, req.body.moduleConfig);
            /**
             * Creating new moduleRouteSettings with old values
             * Needed for UI form generation
             */
            const getCurrentModuleRouteSettingsOperation = yield repository.getModuleRouteSettings(req.params.moduleId);
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
            const newModuleRouteSettings = Object.assign({}, ...generatedModuleRouteSettings);
            console.log(newModuleRouteSettings);
            const updateModuleRouteSettings = yield repository.updateModuleRouteSettings(req.params.moduleId, newModuleRouteSettings);
            return res.send(modifyModuleConfigOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
};
