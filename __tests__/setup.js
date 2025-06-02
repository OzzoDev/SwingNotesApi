import { executeQuery } from "../utils/utils.js";
import bcrypt from "bcryptjs";

export const seedTestDb = async () => {
  await executeQuery(`DELETE FROM note`);
  await executeQuery(`DELETE FROM "user"`);

  const passwordHash = await bcrypt.hash("1234", 10);

  const users = [
    ["alice", "alice@test.com"],
    ["bob", "bob@test.com"],
  ];

  const notes = [
    ["test note", "this is a test note"],
    ["secret", "my secret note"],
  ];

  for (const [name, email] of users) {
    await executeQuery(`INSERT INTO "user" (name, email, password_hash) VALUES ($1, $2, $3)`, [
      name,
      email,
      passwordHash,
    ]);
  }

  const user = await executeQuery(`SELECT id FROM "user" WHERE name = 'alice'`);
  const userId = user[0].id;

  for (const [title, text] of notes) {
    await executeQuery(`INSERT INTO note (user_id, title, text) VALUES ($1, $2, $3)`, [
      userId,
      title,
      text,
    ]);
  }
};
