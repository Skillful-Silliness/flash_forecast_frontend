const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");
const webpackStyleRule = require("./webpackStyleRule.js");

module.exports = merge(common, {
  mode: "production",
  module: { rules: [webpackStyleRule("production")] },
  plugins: [new MiniCssExtractPlugin()],
});
