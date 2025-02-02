"use strict";

const { asyncHandler } = require("../helper/asyncHandler");
const { AuthFailureError } = require("../core/error.response");
const crypto = require("crypto");

const HEADER = {
  AUTHORIZATION: "authorization",
  CLIENT_ID: "client_id",
};

const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.permissions) {
      return res.status(403).json({
        message: "permission denied",
      });
    }

    const validPermission = req.permissions.includes(permission);
    if (validPermission) {
      return res.status(403).json({
        message: "permission denied",
      });
    }

    return next();
  };
};

const bufferToBase64 = (buffer) => {
  return Buffer.from(buffer).toString("base64");
};

const base64ToBuffer = (base64) => {
  if (!base64) {
    throw new Error("Invalid base64 string");
  }

  const binaryString = Buffer.from(base64, "base64").toString("binary");
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const cryptoKeyToBase64 = async (cryptoKey) => {
  const exportedKey = await crypto.subtle.exportKey("raw", cryptoKey);
  return Buffer.from(exportedKey).toString("base64");
};

const generateSalt = async () => {
  const saltBuffer = crypto.getRandomValues(new Uint8Array(64));
  return bufferToBase64(saltBuffer);
};

const generateKey = async (password, existingSalt) => {
  const salt = existingSalt ? existingSalt : await generateSalt();
  const encoder = new TextEncoder();
  const derivationKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const cryptoKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: base64ToBuffer(salt),
      iterations: 1000,
      hash: "SHA-256",
    },
    derivationKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const key = await cryptoKeyToBase64(cryptoKey);

  return { key, salt };
};

const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) {
    throw new AuthFailureError("Invalid Requests");
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) {
    throw new AuthFailureError("Invalid Requests");
  }

  next();
});

module.exports = {
  checkPermission,
  authentication,
  generateKey,
};
