// @ts-check
/**
 * 
 * @param {import("preact-cli").Config} config 
 * @param {import("preact-cli").Env} env 
 * @param {import("preact-cli").Helpers} helpers 
 */
export default function(config, env, helpers) {
	config.resolve.modules.push(env.src);

	for (const {loader} of helpers.getLoadersByName(config, "css-loader")) {
		if (typeof loader !== "string" && "modules" in loader.options) {
			loader.options.modules = false;
		}
	}
}