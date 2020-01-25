import * as server from "./server/server";

const start = async () => {
  await server.start({ port: process.env.PORT || 3006 });
  console.log("SERVER STARTED...");
  console.log("LISTENING ON PORT", process.env.PORT || 3006);
};

start();
