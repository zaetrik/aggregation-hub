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
const supertest_1 = __importDefault(require("supertest"));
describe("Document API", () => {
    const api = supertest_1.default(process.env.CI_STORE || `localhost:${process.env.PORT}`);
    let documentId;
    it("adds a document", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield api
            .post("/document/insert")
            .send({ moduleId: 1, data: { test: "test" } });
        expect(response.body.status).toEqual(201);
        expect(response.body.warnings).toBeNull();
        expect(response.body.id).toBeDefined();
        documentId = response.body.id;
    }));
    it("updates a document", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield api
            .post("/document/update")
            .send({ moduleId: 1, id: documentId, data: { test: "new" } });
        expect(response.body.status).toEqual(200);
        expect(response.body.warnings).toBeNull();
        expect(response.body.id).toBeDefined();
    }));
    it("deletes a document", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield api.delete("/document/delete").send({
            moduleId: 1,
            id: documentId
        });
        expect(response.body.status).toEqual(200);
        expect(response.body.warnings).toBeNull();
    }));
});
