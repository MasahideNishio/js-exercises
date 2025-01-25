export default {
  testEnvironment: "node",
  transform: {},
  collectCoverageFrom: ["src/**/*.{js,ts}"], // カバレッジ収集設定
  moduleNameMapper: {
    "^node-fetch$": "node-fetch", // node-fetchをESモジュールとして扱う設定
  },
};
