import { executeQuery } from "../utils/utils";

const NoteModel = {
  filterByTitle: async (title, userId) => {
    return await executeQuery(
      `
      SELECT 
          n.id, 
          n.title, 
          n.text, 
          n.created_at, 
          n.modified_at,
          u.name AS user
      FROM note n
      INNER JOIN "user" u 
        ON n.user_id = u.id
      WHERE n.title ILIKE $1 AND u.id = $2
      `,
      [`%${title}%`, userId]
    );
  },
  get: async (userId) => {
    return await executeQuery(
      `
      SELECT 
          n.id, 
          n.title, 
          n.text, 
          n.created_at, 
          n.modified_at,
          u.name AS user
      FROM note n
      INNER JOIN "user" u 
        ON n.user_id = u.id
      WHERE u.id = $1
    `,
      [userId]
    );
  },
  create: async (title, text, userId) => {
    return (
      await executeQuery(
        `
        INSERT INTO note (title, text, user_id)
        VALUES ($1, $2, $3)
        RETURNING 
            id, 
            title, 
            text, 
            created_at, 
            modified_at,
            (SELECT name FROM "user" WHERE id = $3) AS user
        `,
        [title, text, userId]
      )
    )[0];
  },
  update: async (title, text, userId, noteId) => {
    const fields = {};
    if (title !== undefined) fields.title = title;
    if (text !== undefined) fields.text = text;

    const keys = Object.keys(fields);
    const values = Object.values(fields);

    if (keys.length === 0) return null;

    const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");
    const noteIdIndex = keys.length + 1;
    const userIdIndex = keys.length + 2;

    return (
      await executeQuery(
        `
        UPDATE note
        SET ${setClause}, modified_at = NOW()
        WHERE id = $${noteIdIndex} AND user_id = $${userIdIndex}
        RETURNING 
            id, 
            title, 
            text, 
            created_at, 
            modified_at,
            (SELECT name FROM "user" WHERE id = $${userIdIndex}) AS user
        `,
        [...values, noteId, userId]
      )
    )[0];
  },
  delete: async (noteId, userId) => {
    return (
      await executeQuery(
        `
        DELETE FROM note
        WHERE id = $1 AND user_id = $2
        RETURNING 
            id, 
            title, 
            text, 
            created_at, 
            modified_at,
            (SELECT name FROM "user" WHERE id = $2) AS user
        `,
        [noteId, userId]
      )
    )[0];
  },
};

export default NoteModel;
