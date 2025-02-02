"use strict";

const redis = require("redis");

let client;

async function getRedisClient() {
  if (!client) {
    client = redis.createClient();
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
