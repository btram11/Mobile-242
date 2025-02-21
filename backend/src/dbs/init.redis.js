"use strict";

const redis = require("redis");

let client;

async function getRedisClient() {
  if (!client) {
    client = redis.createClient({
      url: process.env.REDIS_URL | "redis://localhost:6379",
    });
  }
  try {
    await client.connect();
    console.log("Redis client connected successfully.");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }

  return client;
}

module.exports = getRedisClient;
