import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import '../../block-editor-group.scss';
import './editor.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import json from './block.json';

// Slides can only be used inside the carousel, so they are registered from this bundle
import '../carousel-slide';

const { name, ...settings } = json;

registerBlockType( name, {
	...settings,
	edit,
	save,
	deprecated,
} );
