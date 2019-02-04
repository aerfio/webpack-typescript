const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const typescriptFormatter = require("react-dev-utils/typescriptFormatter");
module.exports = function(webpackEnv) {
    const isEnvDevelopment = webpackEnv === "development";
    const isEnvProduction = webpackEnv === "production";
    return {
        entry: "./src/index.tsx",
        mode: isEnvProduction
            ? "production"
            : isEnvDevelopment && "development",

        bail: isEnvProduction,
        devtool: isEnvProduction
            ? shouldUseSourceMap
                ? "source-map"
                : false
            : isEnvDevelopment && "cheap-module-source-map",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "js/[name].bundle.js",
        },
        optimization: {
            minimize: isEnvProduction,
        },
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"],
        },
        devServer: {
            overlay: true,
            quiet: true,
            watchContentBase: true,
            contentBase: path.join(__dirname, "src"),
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: path.resolve("./src"),
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        cacheCompression: isEnvProduction,
                        compact: isEnvProduction,
                    },
                },
            ],
        },
        plugins: [
            // new webpack.NamedModulesPlugin(),

            // new CheckerPlugin(),
            new HtmlWebPackPlugin(
                Object.assign(
                    {},
                    {
                        template: "./public/index.html",
                        filename: "./index.html",
                        inject: true,
                    },
                    isEnvProduction
                        ? {
                              minify: {
                                  removeComments: true,
                                  collapseWhitespace: true,
                                  removeRedundantAttributes: true,
                                  useShortDoctype: true,
                                  removeEmptyAttributes: true,
                                  removeStyleLinkTypeAttributes: true,
                                  keepClosingSlash: true,
                                  minifyJS: true,
                                  minifyCSS: true,
                                  minifyURLs: true,
                              },
                          }
                        : undefined,
                ),
            ),
            new FriendlyErrorsWebpackPlugin(),
            new ForkTsCheckerWebpackPlugin({
                async: false,
                checkSyntacticErrors: true,
                compilerOptions: {
                    module: "esnext",
                    moduleResolution: "node",
                    resolveJsonModule: true,
                    isolatedModules: true,
                    noEmit: true,
                    jsx: "preserve",
                },
                reportFiles: ["src/**/*.{ts,tsx}"],
                silent: true,
                formatter: typescriptFormatter,
            }),
        ],
    };
};
