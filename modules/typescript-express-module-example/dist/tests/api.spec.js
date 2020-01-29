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
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
describe("TypeScript Express Module Example API", () => {
    const api = supertest_1.default(`localhost:${process.env.PORT}`);
    it("returns module config", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/config");
        const moduleConfig = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve("./config.json"), "utf-8"));
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(moduleConfig);
    }));
});
