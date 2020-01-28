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
const async_retry_1 = __importDefault(require("async-retry"));
const cheerio_1 = __importDefault(require("cheerio"));
const logger_1 = __importDefault(require("../utils/logger"));
const startAggregation = (dataStoreUrl, searchQueries, moduleId) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const getSearchResultsPromises = searchQueries.map(searchQuery => getSearchResults(searchQuery));
            const searchResults = yield Promise.all(getSearchResultsPromises);
            const flattenedSearchResults = [].concat(...searchResults);
            if (process.env.NODE_ENV !== "TEST") {
                flattenedSearchResults.map(searchResult => {
                    axios_1.default.post(`${dataStoreUrl}/document/insert`, {
                        moduleId: moduleId,
                        data: searchResult
                    });
                });
            }
            resolve(flattenedSearchResults);
        }
        catch (err) {
            logger_1.default.log("error", err);
            reject(err);
        }
    }));
});
exports.startAggregation = startAggregation;
const stopAggregation = (moduleServiceUrl, moduleId) => __awaiter(this, void 0, void 0, function* () {
    yield axios_1.default.post(`${moduleServiceUrl}/aggregation/${moduleId}/done`, {});
});
exports.stopAggregation = stopAggregation;
/**
 * Fetches HTML from page
 * @param URL Link from page to fetch
 * @returns HTML from page
 */
const getHTML = (url) => __awaiter(this, void 0, void 0, function* () {
    return yield async_retry_1.default((request) => __awaiter(this, void 0, void 0, function* () {
        return yield axios_1.default.get(url).catch(err => {
            logger_1.default.log("error", `Error in getHTML() for URL "${url}": ${err}`);
            throw err;
        });
    }), {
        retries: 3,
        minTimeout: 120000
    });
});
const getSearchResults = (searchQuery) => __awaiter(this, void 0, void 0, function* () {
    const html = yield getHTML(`https://www.google.com/search?q=${searchQuery}&tbm=nws`);
    const $ = yield cheerio_1.default.load(html.data);
    const searchResults = [];
    const scrapedLinks = [];
    $("div > .ZINbbc > .kCrYT").each(function (i, element) {
        try {
            const title = $(this)
                .children()
                .first()
                .text()
                .trim();
            const link = $(this)
                .find("a")
                .attr("href")
                .split("/url?q=")[1]
                .split("&sa=U&")[0];
            const hostname = new URL(link).hostname;
            if (title &&
                link &&
                hostname &&
                scrapedLinks.toString().indexOf(link) === -1) {
                searchResults.push({
                    query: searchQuery,
                    title: title,
                    link: link,
                    hostname: hostname
                });
            }
            scrapedLinks.push(link);
        }
        catch (err) {
            logger_1.default.log("error", err);
        }
    });
    return searchResults;
});
