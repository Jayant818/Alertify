module.exports = {
	webpack: (config, options) => {
		// Merge custom Webpack configuration
		if (options.isServer) {
			config.externals.push("fs");
		}
		if (!options.dev) {
			// Replace React with Preact in production build
			config.resolve.alias = {
				react: "preact/compat",
				"react-dom/test-utils": "preact/test-utils",
				"react-dom": "preact/compat",
			};
		}
		return config;
	},
};
