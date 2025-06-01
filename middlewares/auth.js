import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UnauthenticatedError } from "../errors/error.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
  const authorizationHeader = req.headers?.authorization;

  if (!authorizationHeader) {
    return next(new UnauthenticatedError("Auhtorization header is missing"));
  }

  const [_, token] = authorizationHeader.split(" ");

  if (!token) {
    return next(new UnauthenticatedError("Token is missing"));
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);

    if (!user) {
      return next(new UnauthenticatedError());
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
