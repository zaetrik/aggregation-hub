import supertest from "supertest";

describe("Query API", () => {
  const api = supertest(`localhost:${process.env.PORT}`);

  it("adds a document", async () => {
    const response = await api.get("/query/all?moduleId=1&start=0");

    expect(response.body.status).toEqual(200);
    expect(response.body.data).toBeDefined();
  });
});
