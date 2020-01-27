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
const axios_1 = __importDefault(require("axios"));
const startAggregation = (dataStoreUrl, moduleId) => __awaiter(this, void 0, void 0, function* () {
    return new Promise(resolve => {
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                axios_1.default.post(`${dataStoreUrl}/document/insert`, {
                    moduleId: moduleId,
                    data: { test: "hello", number: i }
                });
            }
            resolve();
        }, 60000);
    });
});
exports.startAggregation = startAggregation;
const stopAggregation = (moduleServiceUrl, moduleId) => __awaiter(this, void 0, void 0, function* () {
    yield axios_1.default.post(`${moduleServiceUrl}/aggregation/${moduleId}/done`, {});
});
exports.stopAggregation = stopAggregation;
