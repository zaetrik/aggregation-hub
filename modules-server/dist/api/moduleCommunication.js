"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
const getRequiredModuleRouteSettings_1 = __importDefault(require("../utils/getRequiredModuleRouteSettings"));
const requiredModuleRouteSettingNotSet_1 = __importDefault(require("../utils/requiredModuleRouteSettingNotSet"));
module.exports = (app, repository) => {
    app.post("/aggregation/:moduleId/start", validators_1.validateStartModuleDataAggregation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getModuleByIdOperation = yield repository.getModuleById(req.params.moduleId);
            if (getModuleByIdOperation.modules.length === 0) {
                throw new Error("MODULE NOT FOUND");
            }
            const module = getModuleByIdOperation.modules[0];
            const routeSettings = yield repository.getModuleRouteSettings(module.id);
            const requiredModuleSettings = getRequiredModuleRouteSettings_1.default(module, "/start");
            if (!routeSettings.routeSettings.routeSettings ||
                requiredModuleRouteSettingNotSet_1.default(routeSettings.routeSettings.routeSettings["/start"], requiredModuleSettings)) {
                throw new Error(JSON.stringify(requiredModuleSettings));
            }
            const startRouteSettings = Object.assign(Object.assign({}, routeSettings.routeSettings.routeSettings["/start"].bodyParams), routeSettings.routeSettings.routeSettings["/start"].queryParams);
            axios_1.default.post(`${module.address}/start`, Object.assign(Object.assign({}, startRouteSettings), { dataStoreUrl: process.env.DATA_STORE_URL, moduleServiceUrl: process.env.SERVICE_URL, moduleId: module.id }));
            return res.status(http_status_1.default.OK).send({
                status: 200,
                message: `Started aggregation process for module ${module.name}`
            });
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.post("/aggregation/:moduleId/done", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getJobByModuleIdOperation = yield repository.getJobByModuleId(req.params.moduleId);
            const job = getJobByModuleIdOperation.jobs[0];
            yield repository.updateJob(Object.assign(Object.assign({}, job), { running: false, lastExecuted: new Date().getTime() }));
            return res.status(http_status_1.default.OK).send({
                status: 200,
                message: `Aggregation process for module with id ${req.params.moduleId} finished`
            });
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
};
