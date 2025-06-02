import { initDB } from "../config/db.js";
import { executeQuery } from "../utils/utils.js";
import { seedNotes } from "./noteSeed.js";
import { seedUsers } from "./userSeed.js";

(async () => {
  await executeQuery(`DROP TABLE IF EXISTS "user" CASCADE`);
  await executeQuery(`DROP TABLE IF EXISTS "note" CASCADE`);
  await executeQuery(`DROP SEQUENCE IF EXISTS note_id_seq CASCADE`);
  await executeQuery(`DROP SEQUENCE IF EXISTS user_id_seq CASCADE`);
  await initDB();
  await seedUsers();
  await seedNotes();

  process.exit();
})();
