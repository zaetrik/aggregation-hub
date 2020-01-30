import {
  Client as ElasticsearchClient,
  ApiResponse
} from "@elastic/elasticsearch";
import { RequestBodySearch } from "elastic-builder";
import buildQuery from "../utils/buildQuery";

const repository = (client: ElasticsearchClient): Repository => {
  /**
   * Document API
   */
  const insertDocument = async (
    dataToAdd: InsertDocumentRequestData
  ): Promise<InsertUpdateDocumentResponse> => {
    const insertOperation = await client.index({
      index: `module-${dataToAdd.moduleId}`,
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
      index: `module-${dataToUpdate.moduleId}`,
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
        index: `module-${dataToDelete.moduleId}`,
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

  /**
   * Index API
   */

  const createIndex = async (
    moduleId: string
  ): Promise<CreateDeleteIndexResponse> => {
    const createIndexOperation = await client.indices.create({
      index: `module-${moduleId}`
    });

    return {
      status: createIndexOperation.statusCode,
      index: createIndexOperation.body.index
    };
  };

  const deleteIndex = async (
    moduleId: string
  ): Promise<CreateDeleteIndexResponse> => {
    const deleteIndexOperation = await client.indices.delete({
      index: `module-${moduleId}`
    });

    return {
      status: deleteIndexOperation.statusCode,
      index: `module-${moduleId}`
    };
  };

  const getDocumentCountFromIndex = async (
    moduleId: string
  ): Promise<{ status: number; count: number }> => {
    const getDocumentCountOperation: ApiResponse = await client.count({
      index: `module-${moduleId}`
    });

    return { status: 200, count: getDocumentCountOperation.body.count };
  };

  const getMappingFromIndex = async (
    moduleId: string
  ): Promise<{ status: number; mapping: object }> => {
    const getMappingFromIndexOperation: ApiResponse = await client.indices.getMapping(
      {
        index: `module-${moduleId}`
      }
    );

    return {
      status: 200,
      mapping: getMappingFromIndexOperation.body[`module-${moduleId}`].mappings
    };
  };

  /**
   * Query API
   */

  const queryAllFromIndex = async (
    moduleId: string,
    start: number
  ): Promise<{ status: number; data: object[] }> => {
    const queryAllOperation: ApiResponse = await client.search({
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
  };

  const query = async (
    indices: string[],
    size: number,
    start: number,
    query: { [key: string]: any }
  ): Promise<{ status: number; data: object[] }> => {
    const generatedQuery: RequestBodySearch = buildQuery(query);

    const queryOperation: ApiResponse = await client.search({
      index: indices.map(moduleId => `module-${moduleId}`),
      from: start ? start : 0,
      size: size ? size : 10,
      body: generatedQuery.toJSON()
    });

    return {
      status: 200,
      data: queryOperation.body.hits.hits.map(item => item._source)
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
    queryAllFromIndex,
    query
  };
};

const connect = (databaseConnection: ElasticsearchClient): Repository => {
  return repository(databaseConnection);
};

export { connect };
