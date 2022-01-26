const { resolve } = require("path");
const { ProgressPlugin } = require("webpack");

module.exports = {
  mode: "production",

  target: "node",
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },

  entry: "./src/index.ts",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],

    alias: {
      "@api": resolve(__dirname, "../src/api/"),
      "@config": resolve(__dirname, "../src/config/"),
      "@helpers": resolve(__dirname, "../src/helpers/"),
      "@loaders": resolve(__dirname, "../src/loaders/"),
      "@model": resolve(__dirname, "../src/model/"),
      "@services": resolve(__dirname, "../src/services/"),
    },
  },

  output: {
    filename: "index.js",
    path: resolve(__dirname, "../build"),
  },

  plugins: [new ProgressPlugin()],
};
