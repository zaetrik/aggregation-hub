import supertest from "supertest";

describe("Query API", () => {
  const api = supertest(`localhost:${process.env.PORT}`);

  it("gets all documents from index", async () => {
    const response = await api.get("/query/all?moduleId=1&start=0");

    expect(response.body.status).toEqual(200);
    expect(response.body.data).toBeDefined();
  });

  it("query indices", async () => {
    const response = await api.post("/query").send({
      moduleIds: ["1"],
      start: 0,
      size: 10,
      query: {
        hostname: "www.test.de",
        link: "www.test.de/test"
      }
    });

    expect(response.body.status).toEqual(200);
    expect(response.body.data).toBeDefined();
  });
});
