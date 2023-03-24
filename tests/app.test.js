// Importing Required Modules
const request = require("supertest");
const app = require("../app");

// Test the root route
describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

// Test the user routes
describe("Test the user routes", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
  });

  test("It should response the POST method", async () => {
    const response = await request(app).post("/users").send({
      username: "John",
      email: "john@test.com",
    });
    expect(response.statusCode).toBe(200);
  });
});

// Test the book routes
describe("Test the book routes", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/books");
    expect(response.statusCode).toBe(200);
  });

  test("It should response the POST method", async () => {
    const response = await request(app).post("/books").send({
      title: "Book Title",
      author: "Author Name",
    });
    expect(response.statusCode).toBe(200);
  });
});
