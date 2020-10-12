import service from "../../src/service";
import request from "supertest";
// close the server after each test
afterEach(done => {
  service.close();
  done();
});

describe("routes /api/v1", () => {
  it("should return ok", async () => {
    const response = await request(service).get("/api/v1");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body.status).toEqual("ok");
  });
});
