import NoteModel from "../models/NoteModel.js";

const NoteService = {
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
    return (await NoteModel.create(title, text, userId)) || null;
  },
  update: async (tilte, text, noteId, userId) => {
    return (await NoteModel.update(tilte, text, noteId, userId)) | null;
  },
  delete: async (noteId, userId) => {
    return (await NoteModel.delete(noteId, userId)) || null;
  },
};

export default NoteService;
