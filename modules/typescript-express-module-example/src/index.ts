import * as server from "./server/server";

const start = async () => {
  await server.start({ port: 3005 });
  console.log("SERVER STARTED...");
  console.log("LISTENING ON PORT", 3005);
};

start();
