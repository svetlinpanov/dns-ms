import { DnsController } from "../controllers";
import { injectable } from "inversify";
import Router from "koa-router";

@injectable()
export class DnsRouter {
  public readonly router: Router;

  constructor(private dnsController: DnsController) {
    this.router = new Router({ prefix: "/api/v1/dns" });
    this.init();
  }
  private init(): void {
    this.router.post(`/`, async ctx => {
      await this.dnsController.createCNameRecord(ctx);
    });
  }
}
