import supertest from "supertest";

describe("Jobs API", () => {
  const api = supertest(`localhost:${process.env.PORT}`);

  it("adds a job", async () => {
    const response = await api.post("/jobs").send({
      moduleId: 1,
      interval: 1,
      execute: false,
      lastExecuted: 123456789,
      running: false
    });

    expect(response.body.status).toEqual(200);
    expect(response.body.jobs).toBeDefined();
  });

  it("gets all jobs", async () => {
    const response = await api.get("/jobs");

    expect(response.body.status).toEqual(200);
    expect(response.body.jobs).toBeDefined();
  });

  it("gets a job with moduleId", async () => {
    const response = await api.get("/jobs/id/1");

    expect(response.body.status).toEqual(200);
    expect(response.body.jobs).toBeDefined();
  });

  it("updates a job", async () => {
    const response = await api.post("/jobs/update").send({
      moduleId: 1,
      interval: 1,
      execute: false,
      lastExecuted: 123456789,
      running: true
    });

    expect(response.body.status).toEqual(200);
    expect(response.body.jobs).toBeDefined();
  });

  it("deletes a job", async () => {
    const response = await api.delete("/jobs/id/1");

    expect(response.body.status).toEqual(200);
  });
});
