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
describe("Module Communication API", () => {
    const api = supertest_1.default(`localhost:${process.env.PORT}`);
    it("throws error when required route settings are not set", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api.post("/modules").send({
            name: "testing-job-execution",
            address: `http://${process.env.MODULE_HOST}:${process.env.MODULE_PORT}`
        });
        const getModuleResponse = yield api.get("/modules/testing-job-execution");
        const moduleId = getModuleResponse.body.modules[0].id;
        const response = yield api.post(`/aggregation/${moduleId}/start`);
        expect(response.status).toEqual(400);
        expect(response.body.status).toEqual(400);
        expect(response.body.message).toContain('Required routeSettings not set: {"body":["searchQueries"],"query":[]}');
    }));
    it("starts job execution for a module", () => __awaiter(void 0, void 0, void 0, function* () {
        const getModuleResponse = yield api.get("/modules/testing-job-execution");
        const moduleId = getModuleResponse.body.modules[0].id;
        yield api.post(`/modules/id/${moduleId}/routeSettings`).send({
            moduleRouteSettings: {
                "/start": {
                    method: "POST",
                    bodyParams: { searchQueries: ["testSetting"] },
                    queryParams: {}
                },
                "/config": { method: "GET", bodyParams: {}, queryParams: {} }
            }
        });
        const response = yield api.post(`/aggregation/${moduleId}/start`);
        expect(response.status).toEqual(200);
        expect(response.body.status).toEqual(200);
        expect(response.body.message).toEqual(`Started aggregation process for module ${getModuleResponse.body.modules[0].name}`);
    }));
});
