import {
  Client as ElasticsearchClient,
  ApiResponse
} from "@elastic/elasticsearch";
import logger from "../utils/logger";

const repository = (client: ElasticsearchClient): Repository => {
  const insertDocument = async (
    dataToAdd: InsertDocumentRequestData
  ): Promise<InsertUpdateDocumentResponse> => {
    const insertOperation = await client.index({
      index: `module-${dataToAdd.index}`,
      body: dataToAdd.data
    });

    return {
      status: insertOperation.statusCode,
      warnings: insertOperation.warnings,
      id: insertOperation.body._id
    };
  };

  const updateDocument = async (
    dataToUpdate: UpdateDocumentRequestData
  ): Promise<InsertUpdateDocumentResponse> => {
    const updateOperation = await client.update({
      index: `module-${dataToUpdate.index}`,
      id: dataToUpdate.id,
      body: { doc: dataToUpdate.data, doc_as_upsert: false }
    });

    return {
      status: updateOperation.statusCode,
      warnings: updateOperation.warnings,
      id: updateOperation.body._id
    };
  };

  const deleteDocument = async (
    dataToDelete: DeleteDocumentRequestData
  ): Promise<DeleteDocumentResponse> => {
    const deleteOperation = await client
      .delete({
        index: `module-${dataToDelete.index}`,
        id: dataToDelete.id
      })
      // catch error to check which error type it is exactly
      .catch(err => {
        if (err.meta.statusCode === 404) {
          throw new Error("document_not_found");
        } else {
          throw err;
        }
      });

    return {
      status: deleteOperation.statusCode,
      warnings: deleteOperation.warnings
    };
  };

  const createIndex = async (
    index: string
  ): Promise<CreateDeleteIndexResponse> => {
    const createIndexOperation = await client.indices.create({
      index: `module-${index}`
    });

    return {
      status: createIndexOperation.statusCode,
      index: createIndexOperation.body.index
    };
  };

  const deleteIndex = async (
    index: string
  ): Promise<CreateDeleteIndexResponse> => {
    const deleteIndexOperation = await client.indices.delete({
      index: `module-${index}`
    });

    return {
      status: deleteIndexOperation.statusCode,
      index: index
    };
  };

  const getDocumentCountFromIndex = async (
    index: string
  ): Promise<{ status: number; count: number }> => {
    const getDocumentCountOperation: ApiResponse = await client.count({
      index: `module-${index}`
    });

    return { status: 200, count: getDocumentCountOperation.body.count };
  };

  const getMappingFromIndex = async (
    index: string
  ): Promise<{ status: number; mapping: object }> => {
    const getMappingFromIndexOperation: ApiResponse = await client.indices.getMapping(
      {
        index: `module-${index}`
      }
    );

    return {
      status: 200,
      mapping: getMappingFromIndexOperation.body[`module-${index}`].mappings
    };
  };

  const queryAllFromIndex = async (
    index: string,
    start: number
  ): Promise<{ status: number; data: object[] }> => {
    const queryAllOperation: ApiResponse = await client.search({
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
  };

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

const connect = (databaseConnection: ElasticsearchClient): Repository => {
  return repository(databaseConnection);
};

export { connect };
