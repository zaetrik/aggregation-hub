"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
/**
 * Connects to db
 * @returns { Promise<YourDatabaseConnection> } YourDatabaseConnection
 */
const connect = () => {
    return new Promise((resolve, reject) => {
        try {
            const client = new YourDatabaseConnection(config_1.dbSettings.dbParameters());
            resolve(client);
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.connect = connect;
