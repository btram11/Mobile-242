const app = require("./src/app");

const PORT = process.env.PORT || 8000;

const { closeRedis } = require("./src/dbs/init.redis");

const server = app.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);
  console.log(`Document available at:`, "http://localhost:8000/api-docs");
});

process.on("SIGINT", () => {
  console.log("shutting down...");
  closeRedis();
  server.close(() => {
    console.log("Closed Express Server");
  });
});
