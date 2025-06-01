import UserModel from "../models/UserModel.js";

const UserService = {
  signup: async (name, email, password) => {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserModel.create(name, email, passwordHash);

    if (!user) {
      return { err: 404 };
    }

    return user;
  },
  login: async (name, password) => {
    const user = UserModel.getByName(name);

    if (!user) {
      return { err: 404 };
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return { err: 400 };
    }

    return user;
  },
};

export default UserService;
