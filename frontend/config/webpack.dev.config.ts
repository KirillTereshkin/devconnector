import { resolve } from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

import "webpack-dev-server";

const config: Configuration = {
  mode: "development",

  entry: resolve(__dirname, "../src/index.tsx"),

  devtool: "inline-source-map",

  devServer: {
    static: "../",
    compress: true,
    port: 3000,

    client: {
      logging: "none",
    },
  },

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
    extensions: [".tsx", ".ts", ".js"],
  },

  output: {
    filename: "index.js",
    path: resolve(__dirname, "dist"),
  },

  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    publicPath: false,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      template: resolve(__dirname, "../public/index.html"),
    }),
  ],
};

export default config;
