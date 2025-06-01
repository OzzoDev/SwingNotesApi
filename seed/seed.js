import { seedNotes } from "./noteSeed.js";
import { seedUsers } from "./userSeed.js";

(async () => {
  await seedUsers();
  await seedNotes();
})();
