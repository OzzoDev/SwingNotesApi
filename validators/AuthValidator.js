import { z } from "zod";

const signupSchema = z
  .object({
    name: z
      .string({ message: "Name is required and must be a string" })
      .nonempty({ message: "Name is required" }),
    email: z
      .string({ message: "Email is required and must be a string" })
      .email({ message: "Invalid email" }),
    password: z
      .string({ message: "Password is required and must be a string" })
      .nonempty({ message: "Password is required" }),
  })
  .strict();

const loginSchema = z
  .object({
    name: z
      .string({ message: "Name is required and must be a string" })
      .nonempty({ message: "Name is required" }),
    password: z
      .string({ message: "Password is required and must be a string" })
      .nonempty({ message: "Password is required" }),
  })
  .strict();

const AuthValidator = {
  validate: {
    body: {
      signup: (req, res, next) => {
        try {
          signupSchema.parse(req.body);
          next();
        } catch (err) {
          next(err);
        }
      },
      login: (req, res, next) => {
        try {
          loginSchema.parse(req.body);
          next();
        } catch (err) {
          next(err);
        }
      },
    },
  },
};

export default AuthValidator;
