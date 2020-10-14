import { CNameRequest } from "../../src/models";
import { validate } from "class-validator";

describe("models/CNameRequest", () => {
  const validatorOptions = {};
  let cnameRequest = new CNameRequest("", "", "", 1);
  beforeEach(() => {
    cnameRequest = new CNameRequest("domainName", "cname", "1.1.1.1", 301);
  });

  it(`has the expected class properties'`, async () => {
    (cnameRequest.domainName = "domainName"),
      (cnameRequest.cname = "cname"),
      (cnameRequest.cnameTarget = "1.1.1.1"),
      (cnameRequest.ttl = 300),
      expect(cnameRequest).toBeDefined();
  });

  describe(`'domainName' validation`, () => {
    it("is valid", async () => {
      cnameRequest.domainName = "domainName";
      expect(await validate(cnameRequest, validatorOptions)).toHaveLength(0);
    });

    it("must have length of 1 character or greater", async () => {
      cnameRequest.domainName = "";
      expect(await validate(cnameRequest, validatorOptions)).toHaveLength(1);
    });

    it("must have a length of 20 characters or fewer", async () => {
      cnameRequest.domainName = "y".repeat(251);
      expect(await validate(cnameRequest, validatorOptions)).toHaveLength(1);
    });
  });

  describe(`'cnameTarget' validation`, () => {
    it("is valid", async () => {
      cnameRequest.cnameTarget = "1.1.1.1";
      expect(await validate(cnameRequest, validatorOptions)).toHaveLength(0);
    });

    it("must have length of 1 character or greater", async () => {
      cnameRequest.cnameTarget = "";
      expect(await validate(cnameRequest, validatorOptions)).toHaveLength(1);
    });

    it("must have a length of 15 characters or fewer", async () => {
      cnameRequest.cnameTarget = "255.255.255.255.1.1";
      expect(await validate(cnameRequest, validatorOptions)).toHaveLength(1);
    });
  });

  describe(`'ttl' validation`, () => {
    it("is valid", async () => {
      cnameRequest.ttl = 300;
      expect(await validate(cnameRequest, validatorOptions)).toHaveLength(0);
    });

    it("must have min value of 300 or greater", async () => {
      cnameRequest.ttl = 1;
      expect(await validate(cnameRequest, validatorOptions)).toHaveLength(1);
    });

    it("must have max value of 2147483647 characters or fewer", async () => {
      cnameRequest.ttl = 2147483647 + 1;
      expect(await validate(cnameRequest, validatorOptions)).toHaveLength(1);
    });
  });
});
