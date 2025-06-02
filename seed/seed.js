import { initDB } from "../config/db.js";
import { seedNotes } from "./noteSeed.js";
import { seedUsers } from "./userSeed.js";

(async () => {
  await initDB();
  await seedUsers();
  await seedNotes();
})();
