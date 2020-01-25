interface DeleteDocumentRequestData {
  id: string;
  index: string;
}

interface InsertDocumentRequestData {
  index: string;
  data: object;
}

interface UpdateDocumentRequestData {
  index: string;
  id: string;
  data: object;
}
