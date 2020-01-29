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
describe("Modules API", () => {
    const api = supertest_1.default(`localhost:${process.env.PORT}`);
    it("adds a module", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.post("/modules?manual=true").send({
            name: "testModule",
            address: "http://test:1234",
            config: {
                routes: {
                    testRoute: {
                        body: {},
                        query: {}
                    }
                },
                description: "Test Description",
                author: "Test Author"
            }
        });
        expect(response.body.status).toEqual(200);
    }));
    it("gets all modules", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/modules");
        expect(response.body.status).toEqual(200);
        expect(response.body.modules).toBeDefined();
    }));
    it("gets modules by name", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/modules/test");
        expect(response.body.status).toEqual(200);
        expect(response.body.modules).toBeDefined();
    }));
    it("gets a module with moduleId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/modules/id/1");
        expect(response.body.status).toEqual(200);
        expect(response.body.modules).toBeDefined();
    }));
    it("updates a module config", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.post("/modules/id/1/config").send({
            moduleId: 1,
            moduleConfig: {
                routes: {
                    testRoute: {
                        body: {},
                        query: {}
                    }
                },
                description: "Test Description",
                author: "Test Author"
            }
        });
        expect(response.body.status).toEqual(200);
    }));
    it("gets module route settings from module", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/modules/id/1/routeSettings");
        expect(response.body.status).toEqual(200);
        expect(response.body.routeSettings).toBeDefined();
    }));
    it("updates module route settings from module", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.post("/modules/id/1/routeSettings").send({
            moduleRouteSettings: { testRoute: {} }
        });
        expect(response.body.status).toEqual(200);
    }));
    it("deletes a module", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.delete("/modules/id/1");
        expect(response.body.status).toEqual(200);
    }));
});
