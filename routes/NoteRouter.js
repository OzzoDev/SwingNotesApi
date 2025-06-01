import express from "express";
import NoteController from "../controllers/NoteController.js";

const router = express.Router();

router.get("/", NoteController.get);

router.post("/", NoteController.create);

router.put("/:noteId", NoteController.update);

router.delete("/:noteId", NoteController.delete);

export default router;
