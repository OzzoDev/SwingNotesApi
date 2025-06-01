import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UnauthenticatedError } from "../errors/error.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
  const authorizationHeader = req.headers?.token;

  const [_, token] = authorizationHeader.split(" ");

  try {
    const user = jwt.verify(token, JWT_SECRET);

    if (!user) {
      next(new UnauthenticatedError());
    }

    req.user = user;
  } catch (err) {
    next(err);
  }
};
