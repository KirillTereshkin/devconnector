import { json } from "express";
import rootRouter from "../api";
import expressApp from "./express";
import createDb from "./mongoose";

const main = expressApp(createDb, [json()], rootRouter);

export default main;
