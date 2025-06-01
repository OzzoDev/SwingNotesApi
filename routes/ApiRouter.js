import express from "express";
import NoteRouter from "./NoteRouter.js";
import AuthRouter from "./AuthRouter.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.use("/notes", authenticate, NoteRouter);

router.use("/user", AuthRouter);

export default router;
