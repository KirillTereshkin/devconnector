import exrpress, { json } from "express";
import rootRouter from "./api";
import createDb from "./model/services/createDb";

// Initiate Db and express App
createDb();
const app = exrpress();

// Add middleware
app.use(json());

// Add routes
app.use("/", rootRouter);

// Start app
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Port is runing on port: ${PORT}`);
});
