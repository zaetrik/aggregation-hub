// database parameters
export const dbSettings = {
  dbParameters: () => ({
    node: process.env.DB_SERVER || "http://localhost:9200",
    maxRetries: 5,
    requestTimeout: 60000
  })
};

// server parameters
export const serverSettings = {
  port: process.env.PORT || 3003
};
