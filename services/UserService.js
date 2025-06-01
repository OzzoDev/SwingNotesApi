import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/error.js";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";

const UserService = {
  signup: async (name, email, password) => {
    const passwordHash = await bcrypt.hash(password, 10);

    const isNotUniqueUser = await UserModel.getByNameOrEmail(name, email);

    if (isNotUniqueUser) {
      throw new ConflictError("Name or email already exists");
    }

    const user = await UserModel.create(name, email, passwordHash);

    return { id: user.id, name: user.name, email: user.email, createdAt: user.created_at };
  },
  login: async (name, password) => {
    const user = await UserModel.getByName(name);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      throw new UnauthenticatedError("Incorrect password");
    }

    return { id: user.id, name: user.id, email: user.email, createdAt: user.created_at };
  },
};

export default UserService;
