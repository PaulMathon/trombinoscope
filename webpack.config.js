import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

import * as path from "path";

export default {
  mode: "production",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve("dist"),
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // Clean up dist folder before each build
/*     new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: path.resolve("src", "index.html"),
    }), */
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
