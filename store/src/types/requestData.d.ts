interface DeleteDocumentRequestData {
  id: string;
  moduleId: string;
}

interface InsertDocumentRequestData {
  moduleId: string;
  data: { [field: string]: any };
}

interface UpdateDocumentRequestData {
  moduleId: string;
  id: string;
  data: object;
}
