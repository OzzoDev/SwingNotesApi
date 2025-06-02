import { NotFoundError } from "../errors/error.js";
import NoteModel from "../models/NoteModel.js";

const NoteService = {
  getById: async (noteId, userId) => {
    const note = await NoteModel.getById(noteId, userId);

    if (!note) {
      throw new NotFoundError("Note not found");
    }

    return note;
  },
  get: async (query, userId) => {
    const { search } = query;

    let notes;

    if (search) {
      notes = await NoteModel.filterByTitle(search, userId);
    } else {
      notes = await NoteModel.get(userId);
    }

    return notes;
  },
  create: async (title, text, userId) => {
    const note = await NoteModel.create(title, text, userId);

    if (!note) {
      throw new NotFoundError("Note not found");
    }

    return note;
  },
  update: async (tilte, text, noteId, userId) => {
    const note = await NoteModel.update(tilte, text, noteId, userId);

    if (!note) {
      throw new NotFoundError("Note not found");
    }

    return note;
  },
  delete: async (noteId, userId) => {
    const note = await NoteModel.delete(noteId, userId);

    if (!note) {
      throw new NotFoundError("Note not found");
    }

    return note;
  },
};

export default NoteService;
