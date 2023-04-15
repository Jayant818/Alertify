const webpack = require("webpack");

module.exports = {
	node: {
		fs: "empty",
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
		}),
	],
};
