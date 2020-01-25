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
module.exports = (app, repository) => {
    app.post("/jobs", validators_1.validateAddModifyJob, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const addNewJobOperation = yield repository.addJob(req.body);
            return res.send(addNewJobOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.post("/jobs/update", validators_1.validateAddModifyJob, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const updateJobOperation = yield repository.updateJob(req.body);
            return res.send(updateJobOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.delete("/jobs/id/:moduleId", validators_1.validateDeleteJob, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteJobByModuleIdOperation = yield repository.deleteJobByModuleId(req.params.moduleId);
            return res.send(deleteJobByModuleIdOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.get("/jobs", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const getAllJobsOperation = yield repository.getAllJobs();
            return res.send(getAllJobsOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.get("/jobs/id/:moduleId", validators_1.validateGetJobByModuleId, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const getJobByModuleIdOperation = yield repository.getJobByModuleId(req.params.moduleId);
            return res.send(getJobByModuleIdOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
};
