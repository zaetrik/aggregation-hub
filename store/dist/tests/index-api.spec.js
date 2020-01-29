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
describe("Index API", () => {
    const api = supertest_1.default(`localhost:${process.env.PORT}`);
    it("deletes an index", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api.post("/index/create/1");
        const response = yield api.delete("/index/delete/1");
        expect(response.body.status).toEqual(200);
        expect(response.body.index).toEqual("module-1");
    }));
    it("creates an index", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api.delete("/index/delete/1");
        const response = yield api.post("/index/create/1");
        expect(response.body.status).toEqual(200);
        expect(response.body.index).toEqual("module-1");
    }));
    it("return 304 when index already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api.post("/index/create/1");
        const response = yield api.post("/index/create/1");
        expect(response.status).toEqual(304);
    }));
    it("gets count of documents in index", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/index/count/1");
        expect(response.body.status).toEqual(200);
        expect(Number(response.body.count)).toEqual(0);
    }));
    it("gets mapping from index", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/index/mapping/1");
        expect(response.body.status).toEqual(200);
        expect(response.body.mapping).toBeInstanceOf(Object);
    }));
});
