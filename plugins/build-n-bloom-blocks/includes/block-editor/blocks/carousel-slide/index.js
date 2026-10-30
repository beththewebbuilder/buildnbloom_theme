import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 * Registered from the Carousel bundle; styles are in carousel/style.scss
 */
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import json from './block.json';

const { name, ...settings } = json;

registerBlockType( name, {
	...settings,
	edit,
	save,
	deprecated,
} );
