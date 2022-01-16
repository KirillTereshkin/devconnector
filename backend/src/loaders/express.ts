import exrpress, { RequestHandler, Router } from "express";

const expressApp =
  (
    runDb: () => void,
    middlwares: Array<RequestHandler>,
    router: Router,
    PORT = process.env.PORT || 4000
  ) =>
  () => {
    // Initiate Db and express App
    runDb();

    const app = exrpress();

    // Add middlewares
    app.use(middlwares);

    // Add routes
    app.use("/", router);

    app.listen(PORT, () => {
      console.log(`Port is runing on port: ${PORT}`);
    });
  };

export default expressApp;
