"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const morgan_json_1 = __importDefault(require("morgan-json"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("../config/config");
const modules_1 = __importDefault(require("../api/modules"));
const moduleCommunication_1 = __importDefault(require("../api/moduleCommunication"));
const dashboards_1 = __importDefault(require("../api/dashboards"));
const jobs_1 = __importDefault(require("../api/jobs"));
const logger_1 = __importDefault(require("../utils/logger"));
const start = (repositoryConnection) => {
    return new Promise((resolve, reject) => {
        const app = express_1.default();
        const logFormat = morgan_json_1.default({
            short: ":method :url :status",
            status: ":status",
            remoteAddress: ":remote-addr",
            remoteUser: ":remote-user",
            date: ":date[web]",
            method: ":method",
            url: ":url",
            referrer: ":referrer",
            userAgent: ":user-agent"
        });
        app.use(morgan_1.default(logFormat, {
            stream: fs_1.default.createWriteStream("./logs/accessLogs.json", {
                flags: "a"
            })
        }));
        app.use(cors_1.default());
        app.use(helmet_1.default({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'none'"],
                    styleSrc: ["'self'"],
                    scriptSrc: ["'self'"],
                    //reportUri: "/",
                    objectSrc: ["'self'"],
                    upgradeInsecureRequests: true,
                    frameAncestors: ["'none'"]
                }
            },
            referrerPolicy: { policy: "same-origin" }
            //featurePolicy: {}
        }));
        app.use(express_1.default.json());
        app.use((err, req, res, next) => {
            logger_1.default.log("error", err);
            reject(new Error("Something went wrong!, err:" + err));
            res.status(500).send("Something went wrong!");
        });
        // we add our API's to the express app
        modules_1.default(app, repositoryConnection);
        moduleCommunication_1.default(app, repositoryConnection);
        jobs_1.default(app, repositoryConnection);
        dashboards_1.default(app, repositoryConnection);
        // finally we start the server, and return the newly created server
        const server = app.listen(config_1.serverSettings.port, () => resolve(server));
    });
};
exports.start = start;
