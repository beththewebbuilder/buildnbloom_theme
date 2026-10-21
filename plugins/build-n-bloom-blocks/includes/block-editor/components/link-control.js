import { __ } from '@wordpress/i18n';
import { URLInput } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';

// Sidebar control for an optional link, stored in the linkUrl and opensInNewTab attributes
export default function LinkControl( { attributes, setAttributes } ) {
	return (
		<div className="full-width-control-wrapper bnb-link-control">
			<URLInput
				label={ __( 'Link (optional)', 'build-n-bloom-blocks' ) }
				value={ attributes.linkUrl }
				onChange={ ( linkUrl ) => setAttributes( { linkUrl } ) }
			/>
			{ attributes.linkUrl &&
				<ToggleControl
					label={ __( 'Open in a new tab', 'build-n-bloom-blocks' ) }
					checked={ attributes.opensInNewTab }
					onChange={ ( opensInNewTab ) => setAttributes( { opensInNewTab } ) }
				/>
			}
		</div>
	);
}
