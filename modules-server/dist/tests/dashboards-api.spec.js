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
describe("Dashboards API", () => {
    const api = supertest_1.default(`localhost:${process.env.PORT}`);
    it("adds a dashboard without a moduleId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.post("/dashboards").send({
            name: "Test Dashboard",
            components: [
                {
                    name: "BarChart",
                    searchQueries: [
                        {
                            moduleIds: ["1", "10"],
                            size: 10,
                            query: {
                                hostname: "test.de"
                            }
                        }
                    ]
                }
            ]
        });
        expect(response.body.status).toEqual(200);
        expect(response.body.dashboards).toBeDefined();
        expect(response.body.dashboards[0].components[0].name).toBeDefined();
    }));
    it("adds a dashboard with a moduleId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.post("/dashboards").send({
            name: "Test Dashboard",
            moduleId: "11",
            components: [
                {
                    name: "BarChart",
                    searchQueries: [
                        {
                            moduleIds: ["1", "10"],
                            size: 10,
                            query: {
                                hostname: "test.de"
                            }
                        }
                    ]
                }
            ]
        });
        expect(response.body.status).toEqual(200);
        expect(response.body.dashboards).toBeDefined();
        expect(response.body.dashboards[0].moduleId).toEqual("11");
    }));
    it("gets all dashboards", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/dashboards");
        expect(response.body.status).toEqual(200);
        expect(response.body.dashboards).toBeDefined();
    }));
    it("gets a dashboard by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/dashboards/id/1");
        expect(response.body.status).toEqual(200);
        expect(response.body.dashboards).toBeDefined();
    }));
    it("gets a dashboard by moduleId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/dashboards/moduleId/11");
        expect(response.body.status).toEqual(200);
        expect(response.body.dashboards).toBeDefined();
    }));
    it("updates a dashboard by dashboardId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.post("/dashboards/id/1/update").send({
            name: "Test Dashboard Updated",
            components: [
                {
                    name: "BarChart",
                    searchQueries: [
                        {
                            moduleIds: ["1", "10"],
                            size: 10,
                            query: {
                                hostname: "test.de"
                            }
                        }
                    ]
                }
            ]
        });
        expect(response.body.status).toEqual(200);
        expect(response.body.dashboards).toBeDefined();
    }));
    it("updates a dashboard by moduleId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.post("/dashboards/moduleId/11/update").send({
            name: "Test Dashboard Updated",
            moduleId: "11",
            components: [
                {
                    name: "BarChart",
                    searchQueries: [
                        {
                            moduleIds: ["1", "10"],
                            size: 10,
                            query: {
                                hostname: "test.de"
                            }
                        }
                    ]
                }
            ]
        });
        expect(response.body.status).toEqual(200);
        expect(response.body.dashboards).toBeDefined();
    }));
    it("deletes a dashboard by dashboardId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.delete("/dashboards/id/1");
        expect(response.body.status).toEqual(200);
    }));
    it("deletes a dashboard by moduleId", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.delete("/dashboards/moduleId/11");
        expect(response.body.status).toEqual(200);
    }));
});
