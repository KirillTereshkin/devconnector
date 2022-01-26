import { json } from "express";
import rootRouter from "@api/index";
import { errorApiBoundary } from "@helpers/middlewares/errorApiBoundary";
import App from "./express";
import createDb from "./mongoose";

const runDb = createDb;
const middlewares = [json()];
const port = process.env.PORT || 4000;
const loggers = [errorApiBoundary];

const app = new App(port, runDb, middlewares, rootRouter, loggers);

export default app;
