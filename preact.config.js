/**
 * 
 * @param {import("preact-cli").Config} config 
 * @param {import("preact-cli").Env} env 
 * @param {import("preact-cli").Helpers} helpers 
 */
export default function (config, env, helpers) {
	// Disable CSS Modules in all cases
	for (const {loader} of helpers.getLoadersByName(config, 'css-loader')) {
		if (typeof loader === "object" && !loader.loader.includes("post")) {
			loader.options.modules = false;
		}
	}

	config.resolve.modules.push(env.src);
}