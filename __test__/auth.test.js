import app from "../server.js";
import request from "supertest";
import { seedTestDb } from "./setup.js";
import { pool } from "../config/db.js";

beforeEach(async () => {
  await seedTestDb();
});

describe("Auth endpoints", () => {
  it("should log in existing user", async () => {
    const res = await request(app).post("/api/user/login").send({
      name: "alice",
      password: "1234",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");

    expect(res.body.data.name).toBe("alice");
  });

  it("should not log in with wrong password", async () => {
    const res = await request(app).post("/api/user/login").send({
      name: "alice",
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(401);
  });
});

afterAll(async () => {
  await pool.end();
});
