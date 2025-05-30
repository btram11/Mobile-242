"use strict";

const { BadRequestError, AuthFailureError } = require("../core/error.response");
const jwt = require("jsonwebtoken");
const {
  getUserByEmail,
  removeToken,
  setTokenById,
  updatePasswordById,
} = require("../dbs/repositories/user.repo");

const { getRedisClient } = require("../dbs/init.redis");

const { generateKey } = require("../auth/authUtils");

class AccessService {
  /**
   * 1 - Check email in dbs
   * 2 - match password
   * 3 - create access token
   * 4 - return data
   */

  static login = async ({ email, password }) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@hcmut\.edu\.vn$/;
    if (!emailRegex.test(email)) {
      throw new AuthFailureError("Invalid email");
    }

    const foundUser = await getUserByEmail(email);
    if (!foundUser) {
      throw new BadRequestError("User not found");
    }

    const hash_password = await generateKey(password, foundUser.salt);
    const matchPassword = hash_password.key === foundUser.password_hashed;

    if (!matchPassword) {
      throw new AuthFailureError("Invalid password");
    }

    const token = jwt.sign(
      { userId: foundUser.user_id, email: foundUser.email },
      process.env.SECRET_KEY || "HCMUT",
      { expiresIn: 900 }
    );

    const redisClient = await getRedisClient();

    await redisClient.set(`access_token:${foundUser.user_id}`, token, {
      EX: 900,
    });

    return {
      status: 200,
      message: "Login successfully",
      access_token: token,
      userId: foundUser.user_id,
      role: foundUser.role,
    };
  };

  static logout = async ({ access_token, id }) => {
    if (!access_token) {
      throw new BadRequestError("Bad Requests");
    }

    const redisClient = await getRedisClient();

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

    const matchPassword = hash_password.key === foundUser.password_hashed;

    if (!matchPassword) {
      throw new AuthFailureError("Invalid password");
    }

    const { key, salt } = await generateKey(new_password);
    const updatePassword = await updatePasswordById(
      key,
      salt,
      foundUser.user_id
    );
    if (!updatePassword) {
      throw new BadRequestError("Failed to update password");
    }

    return {
      status: 200,
      message: "Reset password successfully",
    };
  };
}

module.exports = AccessService;
