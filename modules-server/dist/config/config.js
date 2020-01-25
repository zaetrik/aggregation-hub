"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// database parameters
exports.dbSettings = {
    dbParameters: () => ({
        user: process.env.DB_USERNAME || "user",
        host: process.env.DB_HOST || "localhost",
        database: process.env.DB_NAME || "modules",
        password: process.env.DB_PASSWORD || "password",
        port: Number(process.env.DB_PORT) || 5432
    })
};
// server parameters
exports.serverSettings = {
    port: process.env.PORT || 3004
};
