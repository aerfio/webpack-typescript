const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = merge.smart(common, {
    mode: "production",
    devtool: "source-map",
    bail: true,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve("./src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: true,
                    compact: true,
                },
            },
        ],
    },
    plugins: [new CleanWebpackPlugin(["dist"])],
});
