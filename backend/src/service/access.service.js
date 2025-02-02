"use strict";

const { BadRequestError, AuthFailureError } = require("../core/error.response");
const jwt = require("jsonwebtoken");
const {
  getUserByEmail,
  removeToken,
  setTokenById,
  updatePasswordById,
} = require("../dbs/repositories/user.repo");

const getRedisClient = require("../dbs/init.redis");

const { generateKey } = require("../auth/authUtils");

class AccessService {
  /**
   * 1 - Check email in dbs
   * 2 - match password
   * 3 - create access token
   * 4 - return data
   */
  static login = async ({ email, password }) => {
    const redisClient = await getRedisClient();
    const foundUser = await getUserByEmail(email);
    if (!foundUser) {
      throw new BadRequestError("User not found");
    }

    const hash_password = await generateKey(password, foundUser.salt);
    const matchPassword = hash_password.key === foundUser.password_hash;

    if (!matchPassword) {
      throw new AuthFailureError("Invalid password");
    }

    const token = jwt.sign(
      { userId: foundUser.id, email: foundUser.email },
      process.env.SECREC_KEY || "HCMUT",
      {
        expiresIn: "1h",
      }
    );

    await redisClient.setEx(`access_token:${foundUser.id}`, 60, token);

    const setToken = await setTokenById(token, foundUser.id);

    if (!setToken) {
      throw new BadRequestError("Failed to save access token");
    }

    return {
      status: 200,
      message: "Login successfully",
      access_token: token,
      userId: foundUser.id,
      salt: foundUser.salt,
      role: foundUser.role,
    };
  };

  static logout = async ({ access_token, id }) => {
    const redisClient = await getRedisClient();
    if (!access_token) {
      throw new BadRequestError("Bad Requests");
    }

    const deleteToken = await removeToken(access_token);
    if (!deleteToken) {
      throw new BadRequestError("Failed to logout");
    }

    await redisClient.del(`access_token:${id}`);
    return {
      status: 200,
      message: "Successfully",
    };
  };

  static resetPassword = async ({ email, old_password, new_password }) => {
    const foundUser = await getUserByEmail(email);
    if (!foundUser) {
      throw new BadRequestError("User not found");
    }

    const hash_password = await generateKey(old_password, foundUser.salt);

    const matchPassword = hash_password.key === foundUser.password_hash;

    if (!matchPassword) {
      throw new AuthFailureError("Invalid password");
    }

    const { key, salt } = await generateKey(new_password);
    const updatePassword = await updatePasswordById(key, salt, foundUser.id);
    if (!updatePassword) {
      throw new BadRequestError("Failed to update password");
    }

    return {
      status: 200,
      message: "Reset password successfully",
      salt: foundUser.salt,
    };
  };
}

module.exports = AccessService;
