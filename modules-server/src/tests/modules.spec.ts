import supertest from "supertest";

describe("Modules API", () => {
  const api = supertest(`localhost:${process.env.PORT}`);

  it("adds a module", async () => {
    const response = await api.post("/modules?manual=true").send({
      name: "testModule",
      address: "http://test:1234",
      config: {
        routes: {
          testRoute: {
            body: {},
            query: {}
          }
        },
        description: "Test Description",
        author: "Test Author"
      }
    });

    expect(response.body.status).toEqual(200);
  });

  it("gets all modules", async () => {
    const response = await api.get("/modules");

    expect(response.body.status).toEqual(200);
    expect(response.body.modules).toBeDefined();
  });

  it("gets modules by name", async () => {
    const response = await api.get("/modules/test");

    expect(response.body.status).toEqual(200);
    expect(response.body.modules).toBeDefined();
  });

  it("gets a module with moduleId", async () => {
    const response = await api.get("/modules/id/1");

    expect(response.body.status).toEqual(200);
    expect(response.body.modules).toBeDefined();
  });

  it("updates a module config", async () => {
    const response = await api.post("/modules/id/1/config").send({
      moduleId: 1,
      moduleConfig: {
        routes: {
          testRoute: {
            body: {},
            query: {}
          }
        },
        description: "Test Description",
        author: "Test Author"
      }
    });

    expect(response.body.status).toEqual(200);
  });

  it("gets module route settings from module", async () => {
    const response = await api.get("/modules/id/1/routeSettings");

    expect(response.body.status).toEqual(200);
    expect(response.body.routeSettings).toBeDefined();
  });

  it("updates module route settings from module", async () => {
    const response = await api.post("/modules/id/1/routeSettings").send({
      moduleRouteSettings: { testRoute: {} }
    });

    expect(response.body.status).toEqual(200);
  });

  it("deletes a module", async () => {
    const response = await api.delete("/modules/id/1");

    expect(response.body.status).toEqual(200);
  });
});
