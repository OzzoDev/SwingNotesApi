import { executeQuery } from "../utils/utils.js";

const UserModel = {
  getByNameOrEmail: async (name, email) => {
    return (
      await executeQuery(
        `
        SELECT *
        FROM "user"
        WHERE name = $1 OR name = $2  
    `,
        [name, email]
      )
    )[0];
  },
  getByName: async (name) => {
    return (
      await executeQuery(
        `
        SELECT *
        FROM "user"
        WHERE name = $1    
    `,
        [name]
      )
    )[0];
  },
  create: async (name, email, passwordHash) => {
    return (
      await executeQuery(
        `
        INSERT INTO "user" (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING *;    
    `,
        [name, email, passwordHash]
      )
    )[0];
  },
};

export default UserModel;
