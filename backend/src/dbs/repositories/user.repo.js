// const db = require("../init.postgres");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const InsertUser = async (user) => {
  const result = await prisma.users.create(user)
    .catch((error) => { console.error(error); throw error; });
  return result;
}

const getAllUsers = async () => {
  const result = await prisma.users.findMany().catch((error) => { console.error(error); throw error; });
  return result;
}

const getUserByEmail = async (email) => {
  const result = await prisma.users.findUnique({
    where: {
      email: email,
    },
  }).catch((error) => {
    console.error(error);
    throw error;
  });
  return result;
}

const removeToken = async (access_token) => {
  const result = await prisma.users.update({
    where: {
      access_token: access_token,
    },
    data: {
      access_token: "",
    },
  }).catch((error) => {
    console.error(error);
    throw error;
  });
}
const setTokenById = async (access_token, id) => {
  const result = await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      access_token: access_token,
    },
  }).catch((error) => {
    console.error(error);
    throw error;
  });
  return result;
}
const updatePasswordById = async (new_password, salt, id) => {
  const result = await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      password_hash: new_password,
      salt: salt,
    },
  }).catch((error) => {
    console.error(error);
    throw error;
  });
  return result;
}

module.exports = {
  getUserByEmail,
  removeToken,
  setTokenById,
  updatePasswordById,
  getAllUsers,
};
