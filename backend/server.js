const app = require("./src/app");

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);
  console.log(`Document available at:`, "http://localhost:8000/api-docs");
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit server"));
});
