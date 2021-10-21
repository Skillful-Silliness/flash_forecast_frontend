const common = require("./webpack.common.js");

const { merge } = require("webpack-merge");
const webpackStyleRule = require("./webpackStyleRule.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    static: "../client/dist",
  },
  devtool: "eval-cheap-module-source-map",
  module: { rules: [webpackStyleRule("development")] },
});
