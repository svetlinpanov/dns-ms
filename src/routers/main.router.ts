import { injectable } from "inversify";
import Router from "koa-router";

@injectable()
export class MainRouter {
  public readonly router: Router;
  constructor() {
    this.router = new Router({ prefix: "/api/v1" });
    this.init();
  }
  private init(): void {
    this.router.get(`/`, async ctx => {
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
