import express, { ErrorRequestHandler, RequestHandler, Router } from "express";

export default class App {
  private readonly app = express();

  constructor(
    private readonly port: number | string,

    runDb: () => void = () => {},
    middlewares: RequestHandler[] = [],
    router: Router = Router(),
    loggers: ErrorRequestHandler[] = []
  ) {
    runDb();

    this.app.use(middlewares);
    this.app.use("/", router);
    this.app.use(loggers);
  }

  start = () => {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Port is runing on port: ${this.port}`);
    });
  };
}
