interface Repository {
  insertDocument: (
    dataToAdd: InsertDocumentRequestData
  ) => Promise<InsertUpdateDocumentResponse>;
  updateDocument: (
    dataToUpdate: UpdateDocumentRequestData
  ) => Promise<InsertUpdateDocumentResponse>;
  deleteDocument: (
    dataToDelete: DeleteDocumentRequestData
  ) => Promise<DeleteDocumentResponse>;
  createIndex: (index: string) => Promise<CreateDeleteIndexResponse>;
  deleteIndex: (index: string) => Promise<CreateDeleteIndexResponse>;
  getDocumentCountFromIndex: (
    index: string
  ) => Promise<{ status: number; count: number }>;
  getMappingFromIndex: (
    index: string
  ) => Promise<{ status: number; mapping: object }>;
  queryAllFromIndex: (
    index: string,
    start: number
  ) => Promise<{ status: number; data: object[] }>;
  query: (
    indices: string | string[],
    size: number,
    start: number,
    query: { [key: string]: any }
  ) => Promise<{ status: number; data: object[] }>;
}
