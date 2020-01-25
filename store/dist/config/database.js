"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = require("@elastic/elasticsearch");
const config_1 = require("./config");
/**
 * Connects to db
 * @returns { Promise<Client> } ElasticSearch Client
 */
const connect = () => {
    return new Promise((resolve, reject) => {
        try {
            const client = new elasticsearch_1.Client(config_1.dbSettings.dbParameters());
            resolve(client);
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.connect = connect;
