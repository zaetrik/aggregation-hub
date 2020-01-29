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
// VALIDATORS
const validators_1 = require("./middleware/validators");
module.exports = (app, repository) => {
    /**
     * INDEX ROUTES
     */
    app.post("/index/create/:moduleId", validators_1.validateCreateDeleteIndex, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createIndexOperation = yield repository.createIndex(req.params.moduleId);
            res.status(http_status_1.default.OK).send(createIndexOperation);
        }
        catch (err) {
            if (err.message === "resource_already_exists_exception") {
                res.sendStatus(http_status_1.default.NOT_MODIFIED);
            }
            else {
                logger_1.default.log("error", err, { route: req.originalUrl });
                res.sendStatus(http_status_1.default.BAD_REQUEST);
            }
        }
    }));
    app.delete("/index/delete/:moduleId", validators_1.validateCreateDeleteIndex, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteIndexOperation = yield repository.deleteIndex(req.params.moduleId);
            res.status(http_status_1.default.OK).send(deleteIndexOperation);
        }
        catch (err) {
            if (err.message === "index_not_found_exception") {
                res.sendStatus(http_status_1.default.NOT_MODIFIED);
            }
            else {
                logger_1.default.log("error", err, { route: req.originalUrl });
                res.sendStatus(http_status_1.default.BAD_REQUEST);
            }
        }
    }));
    app.get("/index/count/:moduleId", validators_1.validateGetDocumentCountGetMappingFromIndex, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getDocumentCountOperation = yield repository.getDocumentCountFromIndex(req.params.moduleId);
            res.status(http_status_1.default.OK).send(getDocumentCountOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
    app.get("/index/mapping/:moduleId", validators_1.validateGetDocumentCountGetMappingFromIndex, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getMappingOperation = yield repository.getMappingFromIndex(req.params.moduleId);
            res.status(http_status_1.default.OK).send(getMappingOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
};
