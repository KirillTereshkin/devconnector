import exrpress, { ErrorRequestHandler, RequestHandler, Router } from "express";

const expressApp =
  (
    runDb: () => void,
    middlwares: Array<RequestHandler>,
    router: Router,
    PORT: string | number = 4000,
    errorBoundariesAndLoggers: Array<ErrorRequestHandler> = []
  ) =>
  () => {
    // Initiate Db and express App
    runDb();

    const app = exrpress();

    // Add middlewares
    app.use(middlwares);

    // Add routes
    app.use("/", router);

    // Add loggers or error boundaries
    app.use(errorBoundariesAndLoggers);

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Port is runing on port: ${PORT}`);
    });
  };

export default expressApp;
