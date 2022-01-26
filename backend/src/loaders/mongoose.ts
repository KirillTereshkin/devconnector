/* eslint-disable no-console */
import mongoose from "mongoose";
import config from "@config/index";

const createDb = async () => {
  try {
    await mongoose.connect(config.dbPath);
    console.log("Mongodb coneected successfully");
  } catch (error) {
    console.error(error);
  }
};

export default createDb;
