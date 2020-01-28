import supertest from "supertest";

describe("Index API", () => {
  const api = supertest(`localhost:${process.env.PORT}`);
  it("deletes an index", async () => {
    await api.post("/index/create/1");
    const response = await api.delete("/index/delete/1");

    expect(response.body.status).toEqual(200);
    expect(response.body.index).toEqual("module-1");
  });

  it("creates an index", async () => {
    await api.delete("/index/delete/1");
    const response = await api.post("/index/create/1");

    expect(response.body.status).toEqual(200);
    expect(response.body.index).toEqual("module-1");
  });

  it("return 304 when index already exists", async () => {
    await api.post("/index/create/1");
    const response = await api.post("/index/create/1");

    expect(response.status).toEqual(304);
  });

  it("gets count of documents in index", async () => {
    const response = await api.get("/index/count/1");

    expect(response.body.status).toEqual(200);
    expect(Number(response.body.count)).toEqual(0);
  });

  it("gets mapping from index", async () => {
    const response = await api.get("/index/mapping/1");

    expect(response.body.status).toEqual(200);
    expect(response.body.mapping).toBeInstanceOf(Object);
  });
});
