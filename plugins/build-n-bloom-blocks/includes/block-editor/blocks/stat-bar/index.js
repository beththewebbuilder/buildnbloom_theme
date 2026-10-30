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

// A Stat Item can only be used inside its parent, so it is registered from this bundle
import '../stat-item';

const { name, ...settings } = json;

registerBlockType( name, {
	...settings,
	edit,
	save,
} );
