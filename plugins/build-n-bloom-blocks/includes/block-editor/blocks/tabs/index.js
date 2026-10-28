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

// A Tab can only be used inside Tabs, so it is registered from this bundle
import '../tab';

const { name, ...settings } = json;

registerBlockType( name, {
	...settings,
	edit,
	save,
} );
