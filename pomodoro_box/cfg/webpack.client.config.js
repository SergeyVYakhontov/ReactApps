const path = require("path");
const { HotModuleReplacementPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === "development";
const IS_PROD = NODE_ENV === "production";

const GLOBAL_CSS_REGEXP = /(\.global\.css$|bootstrap.min.css|react-bootstrap-table2.min.css)/;

const DEV_PLUGINS = [new CleanWebpackPlugin(), new HotModuleReplacementPlugin()];

function setupDevtool() {
  if (IS_DEV) return "eval";
  if (IS_PROD) return false;
}

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "react-dom": IS_DEV ? "@hot-loader/react-dom" : "react-dom",
    },
    plugins: [
      new TsconfigPathsPlugin()
    ],
  },
  mode: NODE_ENV ? NODE_ENV : "development",
  entry: [
    path.resolve(__dirname, "../src/client/index.jsx"),
    "webpack-hot-middleware/client?path=//localhost:3001/static/__webpack_hmr",
  ],
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "client.js",
    publicPath: "//localhost:3001/static",
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/
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
    ],
  },
  optimization: {
    minimize: false,
  },
  devtool: setupDevtool(),
  plugins: IS_DEV
    ? DEV_PLUGINS
    : []
};
