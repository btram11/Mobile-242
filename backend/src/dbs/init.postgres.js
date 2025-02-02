if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var { Pool } = require("pg");

const pg_hostname = process.env.DB_HOSTNAME || "localhost";
const pg_port = process.env.DB_PORT || 5432;
const pg_database = process.env.DB_DATABASE || "mobiledev";
const pg_username = process.env.DB_USERNAME || "root";
const pg_password = process.env.DB_PASSWORD || "root123";

class Database {
  constructor() {
    this.pool = this.connect();
  }

  connect() {
    try {
      const pool = new Pool({
        user: pg_username,
        host: pg_hostname,
        database: pg_database,
        password: pg_password,
        port: pg_port,
      });

      pool.on("connect", () =>
        console.log("Connected to PostgresQL successfully")
      );
      pool.on("error", (err) => console.error("Error connection:", err));

      return pool;
    } catch (error) {
      console.error("Failed to connect to PostgreSQL:", error);
      return null;
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async close() {
    if (this.pool) {
      try {
        await this.pool.end();
        console.log("PostgreSQL connection pool closed successfully");
      } catch (error) {
        console.error("Error closing PostgreSQL connection pool:", error);
      }
    }
  }
}

const instancePostgres = Database.getInstance();

module.exports = instancePostgres;
