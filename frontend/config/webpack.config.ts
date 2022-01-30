import { resolve } from "path";
import * as webpack from "webpack";

import "webpack-dev-server";

const config: webpack.Configuration = {
  entry: "../src/index.ts",

  output: {
    path: resolve(__dirname, "../build"),
    filename: "index.js",
  },
};

export default config;
