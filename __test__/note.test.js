import app from "../server.js";
import request from "supertest";
import { seedTestDb } from "./setup.js";
import { pool } from "../config/db.js";

let token;

beforeEach(async () => {
  await seedTestDb();

  const res = await request(app).post("/api/user/login").send({
    name: "alice",
    password: "1234",
  });

  token = res.body.token;
});

describe("Notes endpoints", () => {
  it("should get all notes", async () => {
    const res = await request(app).get("/api/notes").set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should create a note", async () => {
    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New Note", text: "Note text" });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe("New Note");
  });
});

afterAll(async () => {
  await pool.end();
});
