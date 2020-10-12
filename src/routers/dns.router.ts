import { injectable } from "inversify";
import Router from "koa-router";

@injectable()
export class DnsRouter {
  public readonly router: Router;
  constructor() {
    this.router = new Router({ prefix: "/api/v1/dns" });
    this.init();
  }
  private init(): void {
    this.router.post(`/`, async ctx => {
      try {
        ctx.body = {
          status: "ok",
        };
      } catch (err) {
        console.error(err);
      }
    });
  }
}
