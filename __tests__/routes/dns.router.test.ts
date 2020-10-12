import service from "../../src/service";
import request from "supertest";
// close the server after each test
afterEach(done => {
  service.close();
  done();
});

describe("routes/api/v1/dns", () => {
  it("should return 200", async () => {
    const response = await request(service)
      .post("/api/v1/dns")
      // eslint-disable-next-line @typescript-eslint/camelcase
      .send({ domainName: "", cname: "", cname_target: "", ttl: 3600 });
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body.status).toEqual("ok");
  });
});
