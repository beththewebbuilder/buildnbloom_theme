const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// One editor entry per block family (child blocks are imported by their parent),
// plus a "-view" entry for each block that needs front-end JavaScript.
module.exports = {
	...defaultConfig,
	entry: {
		'process-finder': './blocks/process-finder',
		'process-finder-view': './blocks/process-finder/view.js',
		'product-configurator': './blocks/product-configurator',
		'product-configurator-view': './blocks/product-configurator/view.js',
	},
};
