import { z } from "zod";
import NoteModel from "../models/NoteModel.js";
import { BadRequestError, NotFoundError } from "../errors/error.js";
import { safeParseNumber } from "../utils/utils.js";

const createNoteSchema = z
  .object({
    title: z
      .string({ message: "Title is required and must be a string" })
      .nonempty({ message: "Title is required" })
      .max(50, { message: "Title cannot be longer than 50 characters" }),
    text: z
      .string({ message: "Text is required and must be a string" })
      .nonempty({ message: "Text is required" })
      .max(300, { message: "Text cannot be longer than 300 characters" }),
  })
  .strict();

const updateNoteSchema = z
  .object({
    title: z
      .string({ message: "Title is required and must be a string" })
      .nonempty({ message: "Title is required" })
      .max(50, { message: "Title cannot be longer than 50 characters" })
      .optional(),
    text: z
      .string({ message: "Text is required and must be a string" })
      .nonempty({ message: "Text is required" })
      .max(300, { message: "Text cannot be longer than 300 characters" })
      .optional(),
  })
  .strict();

const noteIdSchema = z
  .number({ message: "Note id must be a string" })
  .positive({ message: "Note id must be greater than 0" });

const NoteValidator = {
  validate: {
    body: {
      create: (req, res, next) => {
        try {
          createNoteSchema.parse(req.body);
          next();
        } catch (err) {
          next(err);
        }
      },
      update: (req, res, next) => {
        try {
          updateNoteSchema.parse(req.body);
          next();
        } catch (err) {
          next(err);
        }
      },
    },
    params: {
      id: async (req, res, next) => {
        try {
          const { noteId } = req.params;

          const numericNoteId = safeParseNumber(noteId);

          if (!numericNoteId) {
            return next(new BadRequestError("Note id must be a number"));
          }

          const note = await NoteModel.getById(numericNoteId);

          if (!note) {
            return next(new NotFoundError("Note not found"));
          }

          noteIdSchema.parse(numericNoteId);

          req.params.noteId = numericNoteId;

          next();
        } catch (err) {
          next(err);
        }
      },
    },
  },
};

export default NoteValidator;
