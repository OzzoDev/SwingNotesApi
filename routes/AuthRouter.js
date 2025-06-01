import express from "express";
import AuthController from "../controllers/AuthController.js";
import AuthValidator from "../validators/AuthValidator.js";

const router = express.Router();

router.post("/signup", AuthValidator.validate.body.signup, AuthController.signup);

router.post("/login", AuthValidator.validate.body.login, AuthController.login);

export default router;
