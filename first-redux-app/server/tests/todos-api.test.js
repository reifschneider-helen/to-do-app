const request = require("supertest");
const server = require("../index.js");

afterAll((done) => {
  server.close(done);
});

describe("API /api/todos", () => {
  test("GET /api/todos must return todos list", async () => {
    const res = await request(server).get("/api/todos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  test("POST /api/todos must add a new todo", async () => {
    const newTodo = { text: "newTodo" };
    const res = await request(server)
      .post("/api/todos")
      .send(newTodo)
      .set("Content-Type", "application/json");
    expect(res.statusCode).toBe(201);
    expect(res.body.text).toBe("newTodo");
    expect(res.body.done).toBe(false);
  });
  test("POST /api/todos must return error", async () => {
    const newTodo = { text: "" };
    const res = await request(server)
      .post("/api/todos")
      .send(newTodo)
      .set("Content-Type", "application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body.text).toBe(undefined);
  });
  test("PATCH /api/todos/:id must reverse done field", async () => {
    const newTodo = { text: "newTodo", done: true };
    const postRes = await request(server).post("/api/todos").send(newTodo);
    const id = postRes.body.id;

    const res = await request(server).patch(`/api/todos/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.done).toBe(false);
  });

  test("DELETE /api/todos/:id must delete todo", async () => {
    const newTodo = { text: "Todo to delete" };
    const postRes = await request(server).post("/api/todos").send(newTodo);
    const id = postRes.body.id;

    const res = await request(server).delete(`/api/todos/${id}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((todo) => todo.id === id)).toBe(undefined);
  });
});
