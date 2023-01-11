const request = require("supertest");

describe("test register controller", () => {
  test("register return answer about user", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    const [user] = response.body;
    expect(typeof user.id).toBe("string");
    expect(typeof user.name).toBe("string");
    expect(typeof user.price).toBe("number");
  });
});
