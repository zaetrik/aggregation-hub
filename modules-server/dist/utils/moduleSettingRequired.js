"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (module, route) => {
    const bodyParamRequired = Object.keys(module.config.routes[route].body)
        .map(param => module.config.routes[route].body[param].required ? true : false)
        .some(required => required);
    const queryParamRequired = Object.keys(module.config.routes[route].query)
        .map(param => module.config.routes[route].query[param].required ? true : false)
        .some(required => required);
    return queryParamRequired || bodyParamRequired;
};
