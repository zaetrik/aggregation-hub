import { Client } from "@elastic/elasticsearch";
import { dbSettings } from "./config";

/**
 * Connects to db
 * @returns { Promise<Client> } ElasticSearch Client
 */
const connect = (): Promise<Client> => {
  return new Promise((resolve, reject) => {
    try {
      const client = new Client(dbSettings.dbParameters());
      resolve(client);
    } catch (err) {
      reject(err);
    }
  });
};

export { connect };
