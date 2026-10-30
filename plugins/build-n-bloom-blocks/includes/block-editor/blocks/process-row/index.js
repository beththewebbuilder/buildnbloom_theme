import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 * Registered from the Process List bundle; styles are in process-list/style.scss
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
