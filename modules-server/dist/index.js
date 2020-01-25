"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database = __importStar(require("./config/database"));
const server = __importStar(require("./server/server"));
const config_1 = require("./config/config");
const repository = __importStar(require("./repository/repository"));
const jobs_1 = __importDefault(require("./jobs/jobs"));
const start = () => __awaiter(this, void 0, void 0, function* () {
    const databaseConnection = yield database.connect();
    const repositoryConnection = repository.connect(databaseConnection);
    jobs_1.default(repositoryConnection);
    yield server.start(repositoryConnection);
    console.log("SERVER STARTED...");
    console.log("LISTENING ON PORT", config_1.serverSettings.port);
});
start();
