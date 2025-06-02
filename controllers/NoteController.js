import NoteService from "../services/NoteService.js";

const NoteController = {
  getById: async (req, res, next) => {
    const { noteId } = req.params;
    const { userId } = req.user;

    try {
      const note = await NoteService.getById(noteId, userId);

      res.status(200).json({ data: note, success: true });
    } catch (err) {
      next(err);
    }
  },
  get: async (req, res, next) => {
    const { id: userId } = req.user;

    try {
      const notes = await NoteService.get(req.query, userId);

      res.status(200).json({ data: notes, success: true });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    const { id: userId } = req.user;
    const { title, text } = req.body;

    try {
      const note = await NoteService.create(title, text, userId);

      res.status(201).json({ data: note, success: true, message: "Note created successfully" });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const { id: userId } = req.user;
    const { title, text } = req.body;
    const { noteId } = req.params;

    try {
      const note = await NoteService.update(title, text, noteId, userId);

      res.status(200).json({ data: note, success: true, message: "Note updated successfully" });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const { id: userId } = req.user;
    const { noteId } = req.params;

    try {
      const note = await NoteService.delete(noteId, userId);

      res.status(200).json({ data: note, success: true, message: "Note deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};

export default NoteController;
