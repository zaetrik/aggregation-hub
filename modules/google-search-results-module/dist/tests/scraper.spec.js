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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraper = __importStar(require("../scraper/scraper"));
describe("Google Search Results Scraper", () => {
    it("gets search results", () => __awaiter(void 0, void 0, void 0, function* () {
        const searchResults = yield scraper.startAggregation("", ["test"], "1");
        expect(searchResults).toBeDefined();
        expect(searchResults.length).toEqual(10);
        expect(searchResults[0].query).toEqual("test");
        expect(searchResults[0].title).toBeDefined();
        expect(searchResults[0].link).toBeDefined();
        expect(searchResults[0].hostname).toBeDefined();
    }));
});
