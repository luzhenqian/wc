const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  plugins: [
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["./dist"] })
  ],
  devtool: "cheap-module-eval-source-map"
};
