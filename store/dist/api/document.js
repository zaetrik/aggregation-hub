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
     * DOCUMENT ROUTES
     */
    app.post("/document/insert", validators_1.validateInsertDocument, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const insertOperation = yield repository.insertDocument(req.body);
            res.status(http_status_1.default.OK).send(insertOperation);
        }
        catch (err) {
            if (err.message === "index_not_found_exception") {
                res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(`INDEX FOR MODULE WITH ID ${req.body.moduleId} DOES NOT EXIST`);
            }
            else {
                logger_1.default.log("error", err, { route: req.originalUrl });
                res.sendStatus(http_status_1.default.BAD_REQUEST);
            }
        }
    }));
    app.post("/document/update", validators_1.validateUpdateDocument, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updateOperation = yield repository.updateDocument(req.body);
            res.status(http_status_1.default.OK).send(updateOperation);
        }
        catch (err) {
            if (err.message === "index_not_found_exception") {
                res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(`INDEX FOR MODULE WITH ID ${req.body.moduleId} DOES NOT EXIST`);
            }
            else {
                if (err.message === "document_missing_exception") {
                    res
                        .status(http_status_1.default.BAD_REQUEST)
                        .send(`DOCUMENT ${req.body.id} DOES NOT EXIST IN INDEX FOR MODULE WITH ID ${req.body.moduleId}`);
                }
                else {
                    logger_1.default.log("error", err, { route: req.originalUrl });
                    res.sendStatus(http_status_1.default.BAD_REQUEST);
                }
            }
        }
    }));
    app.delete("/document/delete", validators_1.validateDeleteDocument, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteOperation = yield repository.deleteDocument(req.body);
            res.status(http_status_1.default.OK).send(deleteOperation);
        }
        catch (err) {
            if (err.message === "document_not_found") {
                res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send(`DOCUMENT ${req.body.id} DOES NOT EXIST IN INDEX FOR MODULE WITH ID ${req.body.moduleId}`);
            }
            else {
                logger_1.default.log("error", err, { route: req.originalUrl });
                res.sendStatus(http_status_1.default.BAD_REQUEST);
            }
        }
    }));
};
