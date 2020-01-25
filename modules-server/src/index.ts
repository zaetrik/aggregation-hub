import * as database from "./config/database";
import * as server from "./server/server";
import { serverSettings } from "./config/config";
import * as repository from "./repository/repository";
import { Pool as PostgresPool } from "pg";
import { Repository } from "repository";
import jobsModule from "./jobs/jobs";

const start = async () => {
  const databaseConnection: PostgresPool = await database.connect();
  const repositoryConnection: Repository = repository.connect(
    databaseConnection
  );
  jobsModule(repositoryConnection);

  await server.start(repositoryConnection);
  console.log("SERVER STARTED...");
  console.log("LISTENING ON PORT", serverSettings.port);
};

start();
