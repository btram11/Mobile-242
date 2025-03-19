// const db = require("../init.postgres");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const InsertUser = async (user) => {
  const result = await prisma.user.create(user).catch((error) => {
    console.error(error);
    throw error;
  });
  return result;
};

const getAllUsers = async () => {
  const result = await prisma.users.findMany().catch((error) => {
    console.error(error);
    throw error;
  });
  return result;
};

const getUserByEmail = async (email) => {
  const result = await prisma.user
    .findUnique({
      where: {
        email: email,
      },
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
  return result;
};

const updatePasswordById = async (new_password, salt, id) => {
  const result = await prisma.user
    .update({
      where: {
        user_id: id,
      },
      data: {
        password_hash: new_password,
        salt: salt,
      },
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
  return result;
};

module.exports = {
  getUserByEmail,
  updatePasswordById,
  getAllUsers,
};
