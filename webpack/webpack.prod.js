const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");
const webpackStyleRule = require("./webpackStyleRule.js");

module.exports = merge(common, {
  mode: "production",
  module: { rules: [webpackStyleRule("production")] },
});
