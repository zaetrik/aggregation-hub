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
Object.defineProperty(exports, "__esModule", { value: true });
const repository = (client) => {
    const insertDocument = (dataToAdd) => __awaiter(void 0, void 0, void 0, function* () {
        const insertOperation = yield client.index({
            index: `module-${dataToAdd.moduleId}`,
            body: dataToAdd.data
        });
        return {
            status: insertOperation.statusCode,
            warnings: insertOperation.warnings,
            id: insertOperation.body._id
        };
    });
    const updateDocument = (dataToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
        const updateOperation = yield client.update({
            index: `module-${dataToUpdate.moduleId}`,
            id: dataToUpdate.id,
            body: { doc: dataToUpdate.data, doc_as_upsert: false }
        });
        return {
            status: updateOperation.statusCode,
            warnings: updateOperation.warnings,
            id: updateOperation.body._id
        };
    });
    const deleteDocument = (dataToDelete) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteOperation = yield client
            .delete({
            index: `module-${dataToDelete.moduleId}`,
            id: dataToDelete.id
        })
            // catch error to check which error type it is exactly
            .catch(err => {
            if (err.meta.statusCode === 404) {
                throw new Error("document_not_found");
            }
            else {
                throw err;
            }
        });
        return {
            status: deleteOperation.statusCode,
            warnings: deleteOperation.warnings
        };
    });
    const createIndex = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        const createIndexOperation = yield client.indices.create({
            index: `module-${moduleId}`
        });
        return {
            status: createIndexOperation.statusCode,
            index: createIndexOperation.body.index
        };
    });
    const deleteIndex = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteIndexOperation = yield client.indices.delete({
            index: `module-${moduleId}`
        });
        return {
            status: deleteIndexOperation.statusCode,
            index: `module-${moduleId}`
        };
    });
    const getDocumentCountFromIndex = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        const getDocumentCountOperation = yield client.count({
            index: `module-${moduleId}`
        });
        return { status: 200, count: getDocumentCountOperation.body.count };
    });
    const getMappingFromIndex = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        const getMappingFromIndexOperation = yield client.indices.getMapping({
            index: `module-${moduleId}`
        });
        return {
            status: 200,
            mapping: getMappingFromIndexOperation.body[`module-${moduleId}`].mappings
        };
    });
    const queryAllFromIndex = (moduleId, start) => __awaiter(void 0, void 0, void 0, function* () {
        const queryAllOperation = yield client.search({
            index: `module-${moduleId}`,
            from: start ? start : 0,
            size: 10,
            body: {
                query: {
                    match_all: {}
                }
            }
        });
        return {
            status: 200,
            data: queryAllOperation.body.hits.hits.map(item => item._source)
        };
    });
    return {
        insertDocument,
        updateDocument,
        deleteDocument,
        createIndex,
        deleteIndex,
        getDocumentCountFromIndex,
        getMappingFromIndex,
        queryAllFromIndex
    };
};
const connect = (databaseConnection) => {
    return repository(databaseConnection);
};
exports.connect = connect;
