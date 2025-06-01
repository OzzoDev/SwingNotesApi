import { executeQuery } from "../utils/utils.js";
import bcrypt from "bcryptjs";

export const seedUsers = async () => {
  const passwordHash = await bcrypt.hash("1234", 10);

  await executeQuery(
    `
    INSERT INTO "user" (name, email, password_hash)
    VALUES 
      ('Alice', 'alice@example.com', $1),
      ('Bob', 'bob@example.com', $1),
      ('Carla', 'carla@example.com', $1),
      ('David', 'david@example.com', $1),
      ('Emma', 'emma@example.com', $1),
      ('Frank', 'frank@example.com', $1),
      ('Grace', 'grace@example.com', $1),
      ('Henry', 'henry@example.com', $1),
      ('Isla', 'isla@example.com', $1),
      ('Jack', 'jack@example.com', $1)
  `,
    [passwordHash]
  );

  console.log("✅ Seeded 10 users");
};
