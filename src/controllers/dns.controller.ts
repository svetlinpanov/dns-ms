import { Context } from "koa";
import { DnsService } from "../services";
import { CNameRequest } from "../models";
import { injectable } from "inversify";
import { validate } from "class-validator";

@injectable()
export class DnsController {
  constructor(private dnsService: DnsService) {}

  public async createCNameRecord(ctx: Context): Promise<void> {
    try {
      const { domainName, cname, cnameTarget, ttl } = ctx.request.body;
      const request = new CNameRequest(domainName, cname, cnameTarget, ttl);
      const validationErrors = await validate(request);
      if (validationErrors.length > 0) {
        ctx.status = 400;
        ctx.body = { status: "failure", error: validationErrors };
        return;
      }
      const result = await this.dnsService.createCNameRecord(request);
      if (result) {
        ctx.status = 200;
        ctx.body = { status: "success" };
      } else {
        ctx.status = 400;
        ctx.body = { status: "failure" };
      }
    } catch (err) {
      console.error(err);
    }
  }
}
