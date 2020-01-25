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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
const http_status_1 = __importDefault(require("http-status"));
const scraper = __importStar(require("../scraper/scraper"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../utils/logger"));
module.exports = (app) => {
    app.post("/start", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            scraper
                .startAggregation(req.body.dataStoreUrl, req.body.moduleId)
                .then(() => {
                scraper.stopAggregation(req.body.moduleServiceUrl, req.body.moduleId);
            });
            return res.sendStatus(http_status_1.default.OK);
        }
        catch (err) {
            scraper.stopAggregation(req.body.moduleServiceUrl, req.body.moduleId);
        }
    }));
    app.get("/config", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(http_status_1.default.OK).sendFile(path_1.default.resolve("./config.json"));
        }
        catch (err) {
            logger_1.default.log("error", err, { route: req.originalUrl });
        }
    }));
};
