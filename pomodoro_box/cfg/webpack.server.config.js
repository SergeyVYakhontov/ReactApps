const path = require("path");
const nodeExternals = require("webpack-node-externals");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === "development";

const GLOBAL_CSS_REGEXP = /(\.global\.css$|bootstrap.min.css|react-bootstrap-table2.min.css)/;

const DEV_PLUGINS = [];

module.exports = {
  target: "node",
  mode: NODE_ENV ? NODE_ENV : "development",
  entry: path.resolve(__dirname, "../src/server/server.js"),
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "server.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      globalize$: path.resolve(__dirname, "node_modules/globalize/dist/globalize.js"),
      globalize: path.resolve(__dirname, "node_modules/globalize/dist/globalize"),
      cldr$: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr.js"),
      cldr: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr")
    },
    plugins: [
      new TsconfigPathsPlugin()
    ],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
        ],
        exclude: GLOBAL_CSS_REGEXP
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: [{ loader: "style-loader" },
        { loader: "css-loader" }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "/images/[name].[ext]"
        }
      }
    ]
  },
  optimization: {
    minimize: false,
  },
  devtool: IS_DEV ? "eval" : false,
  plugins: IS_DEV
    ? DEV_PLUGINS
    : []
};
