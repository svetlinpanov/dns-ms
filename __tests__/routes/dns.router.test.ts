import service from "../../src/service";
import request from "supertest";
import { CNameRequest } from "../../src/models";
// close the server after each test
afterEach(done => {
  service.close();
  done();
});

describe("routes/api/v1/dns", () => {
  it("should return 200", async () => {
    const cname = new CNameRequest(
      "google.com",
      "www.google.com",
      "194.153.145.104",
      300,
    );
    const response = await request(service).post("/api/v1/dns").send(cname);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body.status).toEqual("success");
  });
});

describe("routes/api/v1/dns", () => {
  it("should return 400 if dns resolve fails", async () => {
    const cname = new CNameRequest("notexisting", "notexisting", "194.153.145.104", 300);
    const response = await request(service).post("/api/v1/dns").send(cname);
    expect(response.status).toEqual(400);
    expect(response.type).toEqual("application/json");
    expect(response.body.status).toEqual("failure");
  });
});

describe("routes/api/v1/dns", () => {
  it("should return 400 if dns service is down", async () => {
    process.env.DNS_SERVICE_ENDPOINT = "http://localhost";
    const cname = new CNameRequest("notexisting", "notexisting", "194.153.145.104", 300);
    const response = await request(service).post("/api/v1/dns").send(cname);
    expect(response.status).toEqual(400);
    expect(response.type).toEqual("application/json");
    expect(response.body.status).toEqual("failure");
  });
});
