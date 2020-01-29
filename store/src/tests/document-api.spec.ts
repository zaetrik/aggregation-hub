import supertest from "supertest";

describe("Document API", () => {
  const api = supertest(`${process.env}:${process.env.PORT}`);

  let documentId;
  it("adds a document", async () => {
    const response = await api
      .post("/document/insert")
      .send({ moduleId: 1, data: { test: "test" } });

    expect(response.body.status).toEqual(201);
    expect(response.body.warnings).toBeNull();
    expect(response.body.id).toBeDefined();
    documentId = response.body.id;
  });

  it("updates a document", async () => {
    const response = await api
      .post("/document/update")
      .send({ moduleId: 1, id: documentId, data: { test: "new" } });

    expect(response.body.status).toEqual(200);
    expect(response.body.warnings).toBeNull();
    expect(response.body.id).toBeDefined();
  });

  it("deletes a document", async () => {
    const response = await api.delete("/document/delete").send({
      moduleId: 1,
      id: documentId
    });

    expect(response.body.status).toEqual(200);
    expect(response.body.warnings).toBeNull();
  });
});
