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
const executeJob_1 = __importDefault(require("../utils/shared/executeJob"));
module.exports = (app, repository) => {
    app.post("/aggregation/:moduleId/start", validators_1.validateStartModuleDataAggregation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getModuleByIdOperation = yield repository.getModuleById(req.params.moduleId);
            if (getModuleByIdOperation.modules.length === 0) {
                throw new Error("MODULE NOT FOUND");
            }
            const module = getModuleByIdOperation.modules[0];
            yield executeJob_1.default(module, repository);
            return res.status(http_status_1.default.OK).send({
                status: 200,
                message: `Started aggregation process for module ${module.name}`
            });
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            if (err.message.indexOf("Required routeSettings not set") !== -1) {
                res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ status: http_status_1.default.BAD_REQUEST, message: err.message });
            }
            else {
                res.sendStatus(http_status_1.default.BAD_REQUEST);
            }
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
