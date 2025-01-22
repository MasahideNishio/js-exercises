// ex06
import path from "path";

export default {
  mode: "development", // デバッグ用なので開発モード
  entry: "./ch17/ex06/index.js", // エントリポイント
  output: {
    path: path.resolve("ch17/ex06/dist"),
    filename: "bundle.js",
  },
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
  devtool: "source-map", // ソースマップの生成を有効化
  devServer: {
    static: path.resolve("ch17/ex06"),
    open: true,
    port: 8080,
  },
};

// ex05
// import path from "path";

// export default {
//   entry: "./ch17/ex05/index.js",
//   output: {
//     filename: "bundle.js",
//     path: path.resolve("ch17/ex05/dist"),
//   },
//   mode: "development",
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//         },
//       },
//     ],
//   },
//   devServer: {
//     static: path.resolve("ch17/ex05"),
//     port: 8080,
//     open: true,
//   },
// };

// https://qiita.com/suzuki0430/items/ebc2ab53a6456b3372ec
