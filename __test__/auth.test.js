import app from "../server.js";
import request from "supertest";
import { seedTestDb } from "./setup.js";
import { pool } from "../config/db.js";

beforeEach(async () => {
  await seedTestDb();
});

describe("Auth endpoints", () => {
  it("should create user", async () => {
    const res = await request(app).post("/api/user/signup").send({
      name: "carla",
      email: "carla@example.com",
      password: "1234",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.data.name).toBe("carla");
  });

  it("should not create user with nonunique name", async () => {
    const res = await request(app).post("/api/user/signup").send({
      name: "alice",
      email: "alice1234@example.com",
      password: "1234",
    });

    expect(res.statusCode).toBe(409);
  });

  it("should not create user with nonunique email", async () => {
    const res = await request(app).post("/api/user/signup").send({
      name: "alice1234",
      email: "alice@test.com",
      password: "1234",
    });

    expect(res.statusCode).toBe(409);
  });

  it("should not create user with missing name", async () => {
    const res = await request(app).post("/api/user/signup").send({
      email: "alice@example.com",
      password: "1234",
    });

    expect(res.statusCode).toBe(400);
  });

  it("should not create user with missing email", async () => {
    const res = await request(app).post("/api/user/signup").send({
      name: "alice1234",
      password: "1234",
    });

    expect(res.statusCode).toBe(400);
  });

  it("should not create user with missing password", async () => {
    const res = await request(app).post("/api/user/signup").send({
      name: "alice1234",
      email: "alice@example.com",
    });

    expect(res.statusCode).toBe(400);
  });

  it("should not create user with unrecognized req body field", async () => {
    const res = await request(app).post("/api/user/login").send({
      name: "alice",
      email: "alice@example.com",
      password: "1234",
      unsafeField: "xxx",
    });

    expect(res.statusCode).toBe(400);
  });

  it("should log in existing user", async () => {
    const res = await request(app).post("/api/user/login").send({
      name: "alice",
      password: "1234",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.data.name).toBe("alice");
  });

  it("should not log in when user is not found", async () => {
    const res = await request(app).post("/api/user/login").send({
      name: "-----",
      password: "1234",
    });

    expect(res.statusCode).toBe(404);
  });

  it("should not log in with wrong password", async () => {
    const res = await request(app).post("/api/user/login").send({
      name: "alice",
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(401);
  });

  it("should not log in with missing name", async () => {
    const res = await request(app).post("/api/user/login").send({
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(400);
  });

  it("should not log in with missing password", async () => {
    const res = await request(app).post("/api/user/login").send({
      name: "alice",
    });

    expect(res.statusCode).toBe(400);
  });

  it("should not log in with unrecognized req body field", async () => {
    const res = await request(app).post("/api/user/login").send({
      name: "alice",
      password: "1234",
      unsafeField: "xxx",
    });

    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await pool.end();
});
