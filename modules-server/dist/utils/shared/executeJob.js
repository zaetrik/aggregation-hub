"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getRequiredModuleRouteSettings_1 = __importDefault(require("./getRequiredModuleRouteSettings"));
const requiredModuleRouteSettingNotSet_1 = __importDefault(require("./requiredModuleRouteSettingNotSet"));
const axios_1 = __importDefault(require("axios"));
exports.default = (module, repository) => __awaiter(void 0, void 0, void 0, function* () {
    const routeSettings = yield repository.getModuleRouteSettings(`${module.id}`);
    const requiredModuleSettings = getRequiredModuleRouteSettings_1.default(module, "/start");
    if (!routeSettings.routeSettings.routeSettings ||
        requiredModuleRouteSettingNotSet_1.default(routeSettings.routeSettings.routeSettings["/start"], requiredModuleSettings)) {
        throw new Error(`Required routeSettings not set: ${JSON.stringify(requiredModuleSettings)}`);
    }
    const startRouteSettings = Object.assign(Object.assign({}, routeSettings.routeSettings.routeSettings["/start"].bodyParams), routeSettings.routeSettings.routeSettings["/start"].queryParams);
    axios_1.default.post(`${module.address}/start`, Object.assign(Object.assign({}, startRouteSettings), { dataStoreUrl: process.env.DATA_STORE_URL, moduleServiceUrl: process.env.SERVICE_URL, moduleId: module.id }));
});
