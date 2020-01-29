"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param { routeSettings: { bodyParams: {}, queryParams: {} } }
 * @param { body: string[]; query: string[] }
 * @returns { boolean } true if a required route setting is not set
 */
exports.default = (routeSettings, requiredModuleSettings) => {
    if (!routeSettings)
        return true;
    const requiredBodyParamNotSet = requiredModuleSettings.body
        .map(param => (routeSettings.bodyParams[param] ? true : false))
        .some(paramSetting => false);
    const requiredQueryParamNotSet = requiredModuleSettings.query
        .map(param => (routeSettings.queryParams[param] ? true : false))
        .some(paramSetting => false);
    return requiredBodyParamNotSet || requiredQueryParamNotSet;
};
