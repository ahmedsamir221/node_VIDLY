const request = require("supertest");
const { Genre } = require("../../../models/genres");
const { User } = require("../../../models/users");

let server;
describe("auth middleware", () => {

  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    await Genre.remove({});
    server.close();
  });

  let token;

  exec = () => {
    return request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };

  beforeEach(() => {
    token = new User().generateToken();
  });

  it("should return 200 if the token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(201);
  });

  it("should return 401 if the token is not exsit", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if the token is not invalid", async () => {
    token = "131213";
    const res = await exec();
    expect(res.status).toBe(400);
  });
});
