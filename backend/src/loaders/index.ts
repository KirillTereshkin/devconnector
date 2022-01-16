import { json } from "express";
import rootRouter from "../api";
import { errorApiBoundary } from "../helpers/middlewares/errorApiBoundary";
import expressApp from "./express";
import createDb from "./mongoose";

const runDb = createDb;
const middlewares = [json()];
const port = process.env.PORT || 4000;
const errorBoundariesAndLoggers = [errorApiBoundary];

const main = expressApp(
  createDb,
  middlewares,
  rootRouter,
  port,
  errorBoundariesAndLoggers
);

export default main;
