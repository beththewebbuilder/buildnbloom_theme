import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 * Registered from the Stat Bar bundle; styles are in stat-bar/style.scss
 */
import edit from './edit';
import save from './save';
import json from './block.json';

const { name, ...settings } = json;

registerBlockType( name, {
	...settings,
	edit,
	save,
} );
