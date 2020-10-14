import { injectable } from "inversify";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import { DnsRouter, MainRouter } from "./routers";
@injectable()
export class App {
  private app: Koa;
  PORT = process.env.PORT || 3001;

  constructor(private mainRouter: MainRouter, private dnsRouter: DnsRouter) {
    this.app = new Koa();
    this.app.use(bodyParser());
    this.app.use(logger());
    this.initRoutes();
  }

  private initRoutes(): void {
    this.app.use(this.mainRouter.router.routes());
    this.app.use(this.dnsRouter.router.routes());
  }
  public start(): Koa.DefaultState {
    return this.app
      .listen(this.PORT, async () => {
        console.log(`Server listening on port: ${this.PORT}`);
      })
      .on("error", err => {
        console.error(err);
      });
  }
}
