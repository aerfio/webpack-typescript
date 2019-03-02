const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ResourceHintWebpackPlugin = require("resource-hints-webpack-plugin");
module.exports = merge.smart(common, {
	mode: "production",
	devtool: "source-map",
	bail: true,
	optimization: {
		nodeEnv: "production",
		concatenateModules: true,
	},
	output: {
		filename: "js/[name][hash:8].min.js",
	},
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
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			openAnalyzer: false,
			reportFilename: "../bundle_analyzer/report.html",
		}),
		new CleanWebpackPlugin(["dist", "bundle_analyzer"]),
		new ResourceHintWebpackPlugin(),
		new HtmlWebPackPlugin({
			template: "./public/index.html",
			filename: "./index.html",
			favicon: "./public/favicon.ico",
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true,
			},
		}),
	],
});
