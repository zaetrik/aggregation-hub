import supertest from "supertest";

describe("Module Communication API", () => {
  const api = supertest(`localhost:${process.env.PORT}`);

  it("throws error when required route settings are not set", async () => {
    await api.post("/modules").send({
      name: "testing-job-execution",
      address: `http://typescript-express-module-example:${process.env.MODULE_PORT}`
    });

    const getModuleResponse = await api.get("/modules/testing-job-execution");
    const moduleId = getModuleResponse.body.modules[0].id;

    const response = await api.post(`/aggregation/${moduleId}/start`);

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual(400);
    expect(response.body.message).toContain(
      'Required routeSettings not set: {"body":["searchQueries"],"query":[]}'
    );
  });

  it("starts job execution for a module", async () => {
    const getModuleResponse = await api.get("/modules/testing-job-execution");
    const moduleId = getModuleResponse.body.modules[0].id;

    await api.post(`/modules/id/${moduleId}/routeSettings`).send({
      moduleRouteSettings: {
        "/start": {
          method: "POST",
          bodyParams: { searchQueries: ["testSetting"] },
          queryParams: {}
        },
        "/config": { method: "GET", bodyParams: {}, queryParams: {} }
      }
    });

    const response = await api.post(`/aggregation/${moduleId}/start`);

    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual(200);
    expect(response.body.message).toEqual(
      `Started aggregation process for module ${getModuleResponse.body.modules[0].name}`
    );
  });
});
