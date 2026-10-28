import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import '../../block-editor-group.scss';
import './editor.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import json from './block.json';

// The cards can only be used inside the grid, so they are registered from this bundle
import '../grid-card';
import '../video-card';

const { name, ...settings } = json;

registerBlockType( name, {
	...settings,
	edit,
	save,
} );
