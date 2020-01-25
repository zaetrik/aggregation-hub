"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository = (client) => {
    const insertDocument = (dataToAdd) => __awaiter(this, void 0, void 0, function* () {
        const insertOperation = yield client.index({
            index: `module-${dataToAdd.index}`,
            body: dataToAdd.data
        });
        return {
            status: insertOperation.statusCode,
            warnings: insertOperation.warnings,
            id: insertOperation.body._id
        };
    });
    const updateDocument = (dataToUpdate) => __awaiter(this, void 0, void 0, function* () {
        const updateOperation = yield client.update({
            index: `module-${dataToUpdate.index}`,
            id: dataToUpdate.id,
            body: { doc: dataToUpdate.data, doc_as_upsert: false }
        });
        return {
            status: updateOperation.statusCode,
            warnings: updateOperation.warnings,
            id: updateOperation.body._id
        };
    });
    const deleteDocument = (dataToDelete) => __awaiter(this, void 0, void 0, function* () {
        const deleteOperation = yield client
            .delete({
            index: `module-${dataToDelete.index}`,
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
    const createIndex = (index) => __awaiter(this, void 0, void 0, function* () {
        const createIndexOperation = yield client.indices.create({
            index: `module-${index}`
        });
        return {
            status: createIndexOperation.statusCode,
            index: createIndexOperation.body.index
        };
    });
    const deleteIndex = (index) => __awaiter(this, void 0, void 0, function* () {
        const deleteIndexOperation = yield client.indices.delete({
            index: `module-${index}`
        });
        return {
            status: deleteIndexOperation.statusCode,
            index: index
        };
    });
    const getDocumentCountFromIndex = (index) => __awaiter(this, void 0, void 0, function* () {
        const getDocumentCountOperation = yield client.count({
            index: `module-${index}`
        });
        return { status: 200, count: getDocumentCountOperation.body.count };
    });
    const getMappingFromIndex = (index) => __awaiter(this, void 0, void 0, function* () {
        const getMappingFromIndexOperation = yield client.indices.getMapping({
            index: `module-${index}`
        });
        return {
            status: 200,
            mapping: getMappingFromIndexOperation.body[`module-${index}`].mappings
        };
    });
    const queryAllFromIndex = (index, start) => __awaiter(this, void 0, void 0, function* () {
        const queryAllOperation = yield client.search({
            index: `module-${index}`,
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
