const defaultConfig = require('@wordpress/scripts/config/webpack.config');

// One editor entry per block family (child blocks are imported by their parent),
// plus a "-view" entry for each block that needs front-end JavaScript.
module.exports = {
	...defaultConfig,
	entry: {
		'image-background': './includes/block-editor/blocks/image-background',
		'youtube-video': './includes/block-editor/blocks/youtube-video',
		'youtube-video-view': './includes/block-editor/blocks/youtube-video/view.js',
		'item-grid': './includes/block-editor/blocks/item-grid',
		'video-card-view': './includes/block-editor/blocks/video-card/view.js',
		'carousel': './includes/block-editor/blocks/carousel',
		'carousel-view': './includes/block-editor/blocks/carousel/view.js',
		'tabs': './includes/block-editor/blocks/tabs',
		'tabs-view': './includes/block-editor/blocks/tabs/view.js',
	},
};
