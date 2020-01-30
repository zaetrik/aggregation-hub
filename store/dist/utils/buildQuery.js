"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const esb = __importStar(require("elastic-builder"));
exports.default = (query) => {
    const queryObjects = Object.keys(query).map(key => getQueryObjects(key, query[key]));
    return esb.requestBodySearch().query(esb.boolQuery().must(queryObjects));
};
const getQueryObjects = (key, item) => {
    return esb.boolQuery().must(esb.matchQuery(key, item));
};
