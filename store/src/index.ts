import * as database from "./config/database";
import * as server from "./server/server";
import { serverSettings } from "./config/config";
import * as repository from "./repository/repository";
import { Client as ElasticsearchClient } from "@elastic/elasticsearch";

const start = async () => {
  const databaseConnection: ElasticsearchClient = await database.connect();
  const repositoryConnection: Repository = repository.connect(
    databaseConnection
  );

  await server.start(repositoryConnection);
  console.log("SERVER STARTED...");
  console.log("LISTENING ON PORT", serverSettings.port);
};

start();
