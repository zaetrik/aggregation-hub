import supertest from "supertest";

describe("Dashboards API", () => {
  const api = supertest(`localhost:${process.env.PORT}`);

  it("adds a dashboard without a moduleId", async () => {
    const response = await api.post("/dashboards").send({
      name: "Test Dashboard",
      components: [
        {
          name: "BarChart",
          searchQueries: [
            {
              moduleIds: ["1", "10"],
              size: 10,
              query: {
                hostname: "test.de"
              }
            }
          ]
        }
      ]
    });

    expect(response.body.status).toEqual(200);
    expect(response.body.dashboards).toBeDefined();
    expect(response.body.dashboards[0].components[0].name).toBeDefined();
  });

  it("adds a dashboard with a moduleId", async () => {
    const response = await api.post("/dashboards").send({
      name: "Test Dashboard",
      moduleId: "11",
      components: [
        {
          name: "BarChart",
          searchQueries: [
            {
              moduleIds: ["1", "10"],
              size: 10,
              query: {
                hostname: "test.de"
              }
            }
          ]
        }
      ]
    });

    expect(response.body.status).toEqual(200);
    expect(response.body.dashboards).toBeDefined();
    expect(response.body.dashboards[0].moduleId).toEqual("11");
  });

  it("gets all dashboards", async () => {
    const response = await api.get("/dashboards");

    expect(response.body.status).toEqual(200);
    expect(response.body.dashboards).toBeDefined();
  });

  it("gets a dashboard by id", async () => {
    const response = await api.get("/dashboards/id/1");

    expect(response.body.status).toEqual(200);
    expect(response.body.dashboards).toBeDefined();
  });

  it("gets a dashboard by moduleId", async () => {
    const response = await api.get("/dashboards/moduleId/11");

    expect(response.body.status).toEqual(200);
    expect(response.body.dashboards).toBeDefined();
  });

  it("updates a dashboard by dashboardId", async () => {
    const response = await api.post("/dashboards/id/1/update").send({
      name: "Test Dashboard Updated",
      components: [
        {
          name: "BarChart",
          searchQueries: [
            {
              moduleIds: ["1", "10"],
              size: 10,
              query: {
                hostname: "test.de"
              }
            }
          ]
        }
      ]
    });

    expect(response.body.status).toEqual(200);
    expect(response.body.dashboards).toBeDefined();
  });

  it("updates a dashboard by moduleId", async () => {
    const response = await api.post("/dashboards/moduleId/11/update").send({
      name: "Test Dashboard Updated",
      moduleId: "11",
      components: [
        {
          name: "BarChart",
          searchQueries: [
            {
              moduleIds: ["1", "10"],
              size: 10,
              query: {
                hostname: "test.de"
              }
            }
          ]
        }
      ]
    });

    expect(response.body.status).toEqual(200);
    expect(response.body.dashboards).toBeDefined();
  });

  it("deletes a dashboard by dashboardId", async () => {
    const response = await api.delete("/dashboards/id/1");

    expect(response.body.status).toEqual(200);
  });

  it("deletes a dashboard by moduleId", async () => {
    const response = await api.delete("/dashboards/moduleId/11");

    expect(response.body.status).toEqual(200);
  });
});
