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
module.exports = (app, repository) => {
    app.post("/dashboards", validators_1.validateAddDashboard, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const addNewDashboardOperation = yield repository.addDashboard(req.body);
            return res.send(addNewDashboardOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.post("/dashboards/id/:dashboardId/update", validators_1.validateModifyDashboard, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updateDashboardOperation = yield repository.updateDashboard(req.params.dashboardId, req.body);
            return res.send(updateDashboardOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.delete("/dashboards/id/:dashboardId", validators_1.validateGetDeleteDashboardById, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteDashboardByIdOperation = yield repository.deleteDashboardById(req.params.dashboardId);
            return res.send(deleteDashboardByIdOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.get("/dashboards", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getAllDashboardsOperation = yield repository.getAllDashboards();
            return res.send(getAllDashboardsOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.get("/dashboards/id/:dashboardId", validators_1.validateGetDeleteDashboardById, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getDashboardByIdOperation = yield repository.getDashboardById(req.params.dashboardId);
            return res.send(getDashboardByIdOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.get("/dashboards/moduleId/:moduleId", validators_1.validateGetDashboardByModuleId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getDashboardByModuleIdOperation = yield repository.getDashboardByModuleId(req.params.moduleId);
            return res.send(getDashboardByModuleIdOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
};
