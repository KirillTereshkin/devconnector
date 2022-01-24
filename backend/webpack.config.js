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
  },

  output: {
    filename: "index.js",
    path: resolve(__dirname, "build"),
  },

  plugins: [new ProgressPlugin()],
};
