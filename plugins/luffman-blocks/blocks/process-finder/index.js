import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import json from './block.json';

// Child blocks can only be used inside this block, so they are registered from this bundle
import '../finder-process';

const { name, ...settings } = json;

registerBlockType( name, {
	...settings,
	edit,
	save,
} );
