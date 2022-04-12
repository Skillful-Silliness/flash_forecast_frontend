const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");
const webpackStyleRule = require("./webpackStyleRule.js");

module.exports = merge(common, {
  mode: "production",
  module: { rules: [webpackStyleRule("production")] },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
});
