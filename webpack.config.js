// webpack.config.js
import path from "path";

export default {
  entry: "./ch17/ex05/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("ch17/ex05/dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    static: path.resolve("ch17/ex05"),
    port: 8080,
    open: true,
  },
};

// https://qiita.com/suzuki0430/items/ebc2ab53a6456b3372ec
