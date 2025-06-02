import dotenv from "dotenv";
import pkg from "pg";
import { executeQuery } from "../utils/utils.js";
const { Pool } = pkg;

dotenv.config();

const POSTGRES_URL = process.env.POSTGRES_URL;

export const pool = new Pool({
  connectionString: POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to Postgres");

    client.release();

    await initDB();

    console.log("✅ All tables ensured successfully");
  } catch (err) {
    console.error("❌ Error connecting to Postgres", err);
  }
})();

export const initDB = async () => {
  try {
    await executeQuery("BEGIN");

    await executeQuery(`
        CREATE TABLE IF NOT EXISTS "user" (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            name VARCHAR(255) NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,    
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

    await executeQuery(`
        CREATE TABLE IF NOT EXISTS note (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
            title VARCHAR(50) NOT NULL,
            text VARCHAR(300) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    
            modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

    await executeQuery("COMMIT");
  } catch (err) {
    await executeQuery("ROLLBACK");
    throw err;
  }
};

export default pool;
