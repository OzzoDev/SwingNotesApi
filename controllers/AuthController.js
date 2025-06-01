import jwt from "jsonwebtoken";
import UserService from "../services/UserService.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const AuthController = {
  signup: async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
      const user = await UserService.signup(name, email, password);

      const token = jwt.sign(user, JWT_SECRET, { expiresIn: "24h" });

      res.status(201).json({ data: user, token, success: true });
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    const { name, password } = req.body;

    try {
      const user = await UserService.login(name, password);

      const token = jwt.sign(user, JWT_SECRET, { expiresIn: "24h" });

      res.status(200).json({ data: user, token, success: true });
    } catch (err) {
      next(err);
    }
  },
};

export default AuthController;
