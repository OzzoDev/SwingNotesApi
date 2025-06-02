import express from "express";
import NoteController from "../controllers/NoteController.js";
import NoteValidator from "../validators/NoteValidator.js";

const router = express.Router();

router.get("/:noteId", NoteValidator.validate.params.id, NoteController.getById);

router.get("/", NoteController.get);

router.post("/", NoteValidator.validate.body.create, NoteController.create);

router.put(
  "/:noteId",
  NoteValidator.validate.params.id,
  NoteValidator.validate.body.update,
  NoteController.update
);

router.delete("/:noteId", NoteValidator.validate.params.id, NoteController.delete);

export default router;
