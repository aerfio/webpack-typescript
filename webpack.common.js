const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const typescriptFormatter = require("react-dev-utils/typescriptFormatter");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./src/index.tsx",

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/[name].bundle.js",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
	},

	module: {
		rules: [
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: require.resolve("url-loader"),
				options: {
					fallback: "file-loader",
					limit: 8192,
					name: "[name].[hash:8].[ext]",
				},
			},
			{
				test: /\.tsx?$/,
				include: path.resolve("./src"),
				loader: "babel-loader",
				options: {
					cacheDirectory: true,
					cacheCompression: false,
					compact: false,
				},
			},
		],
	},
	plugins: [
		new Dotenv(),
		new HtmlWebPackPlugin({
			template: "./public/index.html",
			filename: "./index.html",
			favicon: "./public/favicon.ico",
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
		new CopyWebpackPlugin([
			{
				from: "public/manifest.json",
				to: "./",
			},
		]),
	],
};
