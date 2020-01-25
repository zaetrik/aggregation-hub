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
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const pg_1 = __importDefault(require("pg"));
/**
 * Connects to db
 * @returns { Promise<pg.Pool> }
 */
const connect = () => {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const Pool = pg_1.default.Pool;
            const pool = new Pool(config_1.dbSettings.dbParameters());
            yield createTables(pool);
            resolve(pool);
        }
        catch (err) {
            reject(err);
        }
    }));
};
exports.connect = connect;
const createTables = (pool) => __awaiter(this, void 0, void 0, function* () {
    const modulesTableExists = yield checkTableExists("modules", pool);
    if (!modulesTableExists) {
        yield pool.query(`CREATE TABLE modules(id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, address TEXT NOT NULL, config JSON NOT NULL, "routeSettings" JSON)`);
    }
    const jobsTableExists = yield checkTableExists("jobs", pool);
    if (!jobsTableExists) {
        yield pool.query(`CREATE TABLE jobs(id SERIAL PRIMARY KEY, "moduleId" SERIAL UNIQUE NOT NULL, interval INT NOT NULL, "lastExecuted" BIGINT NOT NULL, execute BOOLEAN NOT NULL, running BOOLEAN NOT NULL)`);
    }
});
const checkTableExists = (tableName, pool) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield pool.query(`SELECT 'public.${tableName}'::regclass`);
        return true;
    }
    catch (err) {
        return false;
    }
});
