import mongoose from "mongoose";
import config from "../../config";

const createDb = async () => {
  try {
    await mongoose.connect(config.dbPath);
    console.log("Mongodb coneected successfully");
  } catch (e) {
    console.error(e);
  }
};

export default createDb;
