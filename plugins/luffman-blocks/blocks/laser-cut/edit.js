import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

// Shows the finished part in the editor; the animation only runs on the live page
export default function Edit( { attributes, setAttributes } ) {
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Animation text', 'luffman-blocks' ) }>
					<TextControl
						label={ __( 'Caption', 'luffman-blocks' ) }
						help={ __( 'Shown along the bottom of the animation.', 'luffman-blocks' ) }
						value={ attributes.caption }
						onChange={ ( caption ) => setAttributes( { caption } ) } />
					<TextareaControl
						label={ __( 'Description', 'luffman-blocks' ) }
						help={ __( 'Read out by screen readers.', 'luffman-blocks' ) }
						value={ attributes.label }
						onChange={ ( label ) => setAttributes( { label } ) } />
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>
				<ServerSideRender block="luffman-blocks/laser-cut" attributes={ attributes } />
			</div>
		</>
	);
}
