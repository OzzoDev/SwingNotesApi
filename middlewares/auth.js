import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UnauthenticatedError } from "../errors/error.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
  const authorizationHeader = req.headers?.authorization;

  if (!authorizationHeader) {
    throw new UnauthenticatedError("Auhtorization header is missing");
  }

  const [_, token] = authorizationHeader.split(" ");

  if (!token) {
    throw new UnauthenticatedError("Token is missing");
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);

    if (!user) {
      next(new UnauthenticatedError());
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
