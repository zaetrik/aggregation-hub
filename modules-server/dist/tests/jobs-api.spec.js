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
describe("Jobs API", () => {
    const api = supertest_1.default(`localhost:${process.env.PORT}`);
    it("adds a job", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.post("/jobs").send({
            moduleId: 1,
            interval: 1,
            execute: false,
            lastExecuted: 123456789,
            running: false
        });
        expect(response.body.status).toEqual(200);
        expect(response.body.jobs).toBeDefined();
    }));
    it("gets all jobs", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/jobs");
        expect(response.body.status).toEqual(200);
        expect(response.body.jobs).toBeDefined();
    }));
    it("gets a job with moduleId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/jobs/id/1");
        expect(response.body.status).toEqual(200);
        expect(response.body.jobs).toBeDefined();
    }));
    it("updates a job", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.post("/jobs/update").send({
            moduleId: 1,
            interval: 1,
            execute: false,
            lastExecuted: 123456789,
            running: true
        });
        expect(response.body.status).toEqual(200);
        expect(response.body.jobs).toBeDefined();
    }));
    it("deletes a job", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.delete("/jobs/id/1");
        expect(response.body.status).toEqual(200);
    }));
});
