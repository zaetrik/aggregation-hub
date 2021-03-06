import supertest from "supertest";
import fs from "fs";
import path from "path";

describe("Google Search Results Module API", () => {
  const api = supertest(`localhost:${process.env.PORT}`);

  it("returns module config", async () => {
    const response = await api.get("/config");
    const moduleConfig = JSON.parse(
      fs.readFileSync(path.resolve("./config.json"), "utf-8")
    );

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(moduleConfig);
  });
});
