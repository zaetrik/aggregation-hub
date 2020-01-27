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
const validators_1 = require("./middleware/validators");
const logger_1 = __importDefault(require("../utils/logger"));
module.exports = (app, repository) => {
    app.get("/query", (req, res) => __awaiter(this, void 0, void 0, function* () { }));
    app.get("/query/all", validators_1.validateQueryAll, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const queryAllOperation = yield repository.queryAllFromIndex(req.query.moduleId, req.query.start);
            return res.status(http_status_1.default.OK).send(queryAllOperation);
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
            res.sendStatus(http_status_1.default.BAD_REQUEST);
        }
    }));
};
