const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const typescriptFormatter = require("react-dev-utils/typescriptFormatter");
const port = 8080;
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
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"],
        },
        devServer: {
            overlay: true,
            port: port,
            quiet: true, //need this for FriendlyErrorsWebpackPlugin
            watchContentBase: true,
            contentBase: path.join(__dirname, "public"),
            watchOptions: {
                ignored: /node_modules/,
            },
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
            new HtmlWebPackPlugin({
                template: "./public/index.html",
                filename: "./index.html",
                favicon: "./public/favicon.ico",
            }),
            new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [
                        `You application is running here http://localhost:${port}`,
                    ],
                    notes: ["Good luck!"],
                },
            }),
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
