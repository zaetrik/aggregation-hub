interface CreateDeleteIndexResponse {
  status: number;
  index: string;
}

interface InsertUpdateDocumentResponse {
  status: number;
  warnings: string[];
  id: any;
}

interface DeleteDocumentResponse {
  status: number;
  warnings: string[];
}
