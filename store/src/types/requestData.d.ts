interface DeleteDocumentRequestData {
  id: string;
  moduleId: string;
}

interface InsertDocumentRequestData {
  moduleId: string;
  data: object;
}

interface UpdateDocumentRequestData {
  moduleId: string;
  id: string;
  data: object;
}
