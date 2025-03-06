"use strict";

const redis = require("redis");
const { RedisError } = require("../core/error.response");

let client = {};
let connectionTimeout;
const statusConnection = {
  CONNECT: "connect",
  END: "end",
  RECONNECT: "reconnecting",
  ERROR: "error",
};

const REDIS_CONNECT_TIMEOUT = 10000;
const REDIS_CONNECT_MESSAGE = {
  code: 6969,
  message: {
    vn: "WTF Redis bị lỗi ?",
    en: "Redis Service Error",
  },
};

const handleTimeoutError = () => {
  connectionTimeout = setTimeout(() => {
    throw new RedisError({
      message: REDIS_CONNECT_MESSAGE.message.vn,
      statusCode: REDIS_CONNECT_MESSAGE.code,
    });
  }, REDIS_CONNECT_TIMEOUT);
};

const handleEventConnection = ({ connectionRedis }) => {
  connectionRedis.on(statusConnection.CONNECT, () => {
    console.log(`Redis status: connected`);
    clearTimeout(connectionTimeout);
  });

  connectionRedis.on(statusConnection.END, () => {
    console.log(`Redis status: disconnected`);
    // connect retry
    handleTimeoutError();
  });

  connectionRedis.on(statusConnection.RECONNECT, () => {
    console.log(`Redis status: reconnecting...`);
    clearTimeout(connectionTimeout);
  });

  connectionRedis.on(statusConnection.ERROR, (err) => {
    console.log(`Redis status: error ${err}`);
    handleTimeoutError();
  });
};

const initRedis = () => {
  const instanceRedis = redis.createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
  });
  client.instanceRedis = instanceRedis.connect();
  handleEventConnection({ connectionRedis: instanceRedis });
};

const getRedisClient = async () => {
  const redisClient = await client.instanceRedis;
  return redisClient;
};

const closeRedis = async () => {
  if (client.instanceRedis) {
    await client.instanceRedis.quit();
    console.log("Redis connection closed");
  }
};

module.exports = { getRedisClient, initRedis, closeRedis };
