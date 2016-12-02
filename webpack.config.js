module.exports = {
	entry: "./networkRequest",
	output: {
		"filename": "app.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},
	resolve: {
		extensions: ["", ".js"]
	}
}
