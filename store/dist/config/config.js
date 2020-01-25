"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// database parameters
exports.dbSettings = {
    dbParameters: () => ({
        node: process.env.DB_SERVER || "http://localhost:9200",
        maxRetries: 5,
        requestTimeout: 60000
    })
};
// server parameters
exports.serverSettings = {
    port: process.env.PORT || 3003
};
