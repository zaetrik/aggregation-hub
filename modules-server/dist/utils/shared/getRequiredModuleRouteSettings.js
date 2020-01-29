"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @returns { body: string[]; query: string[] } required params for route
 */
exports.default = (module, route) => {
    const requiredBodyParams = Object.keys(module.config.routes[route].body)
        .map(param => module.config.routes[route].body[param].required ? param : undefined)
        .filter(item => item);
    const requiredQueryParams = Object.keys(module.config.routes[route].query)
        .map(param => module.config.routes[route].query[param].required ? param : undefined)
        .filter(item => item);
    return { body: requiredBodyParams, query: requiredQueryParams };
};
