import dotenv from "dotenv";
import pkg from "pg";
import { executeQuery } from "../utils/utils";
const { Pool } = pkg;

dotenv.config();

const POSTGRES_URL = process.env.POSTGRES_URL;

const pool = new Pool({
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

const isInitialized = async () => {
  return (
    (
      await executeQuery(`
        SELECT SUM(row_count) AS total_rows
        FROM (
            SELECT COUNT(*) AS row_count
            FROM information_schema.tables
            WHERE table_schema = 'public'
            GROUP BY table_name
        ) AS counts   
    `)
    )[0]?.total_rows > 0
  );
};

const initDB = async () => {
  if (await isInitialized()) {
    return;
  }

  try {
    await client.query("BEGIN");

    await client.query(`
        CREATE TABLE IF NOT EXISTS "user" (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            name VARCHAR(255) NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,    
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

    await client.query(`
        CREATE TABLE IF NOT EXISTS note (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL UNIQUE,
            text VARCHAR(255) NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    
            modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

    await client.query("COMMIT");
  } catch (err) {
    await executeQuery("ROLLBACK");
    throw err;
  }
};

export default pool;
