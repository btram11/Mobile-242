const db = require("../init.postgres");

const InsertUser = async (user) => {
  try {
    const query = ` INSERT INTO users (firstname, lastname, email, password_hash, salt, role, phone_number)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING *;`;
    const values = [
      user.firstname,
      user.lastname,
      user.email,
      user.password_hash,
      user.salt,
      user.role,
      user.phone_number,
    ];

    const result = await db.pool.query(query, values);

    console.log("Inserted user:", result.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

const getUserByEmail = async (email) => {
  const query = `SELECT * FROM  users WHERE email = $1;`;
  try {
    const result = await db.pool.query(query, [email]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const removeToken = async (access_token) => {
  const query = `UPDATE users SET access_token = '' WHERE access_token = $1 RETURNING *;`;
  try {
    const result = await db.pool.query(query, [access_token]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
};

const setTokenById = async (access_token, id) => {
  const query = `UPDATE users SET access_token = $1 WHERE id = $2 RETURNING *;`;
  try {
    const result = await db.pool.query(query, [access_token, id]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
};

const updatePasswordById = async (new_password, salt, id) => {
  const query = `UPDATE users SET password_hash = $1, salt = $2 WHERE id = $3 RETURNING *;`;
  try {
    const result = await db.pool.query(query, [new_password, salt, id]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
};

// const user = {
//   firstname: "Quan",
//   lastname: "Nguyen",
//   email: "user1@gmail.com",
//   password_hash: "WoCvTiAVHGnjQFzOTmKGt6F1uMVPPRGfelt4LmdKYvQ=", // 123456
//   salt: "NvxPruJLPCaLrKPJ+QC2k8o9YViq23RII9UhBeJX43leeLofjK6Z7kxfuoArlutAiEoiwZqoXT4r5r0+Fr+J5g==",
//   role: "customer",
//   phone_number: "0123456789",
// };
// InsertUser(user);

module.exports = {
  getUserByEmail,
  removeToken,
  setTokenById,
  updatePasswordById,
};
