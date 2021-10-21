const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function webpackStyleRule(mode) {
  const devMode = mode === "development";

  return {
    test: /\.css$/i,
    use: [
      devMode ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: true,
          importLoaders: 1,
        },
      },
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: [
              [
                "postcss-preset-env",
                {
                  /* Options */
                },
              ],
            ],
          },
        },
      },
    ],
  };
};
