import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		'data-preview': attributes.preview,
		'data-enquiry-prefix': attributes.enquiryPrefix,
	} );

	return (
		<div { ...blockProps }>
			<div className="luffman-config__stage">
				<div className="luffman-config__preview" role="img" aria-label={ attributes.previewLabel }></div>
			</div>
			<div className="luffman-config__panel">
				{ ! RichText.isEmpty( attributes.eyebrow ) &&
					<RichText.Content tagName="p" className="luffman-eyebrow" value={ attributes.eyebrow } />
				}
				<RichText.Content tagName="h2" className="luffman-config__heading" value={ attributes.heading } />
				<div { ...useInnerBlocksProps.save( { className: 'luffman-config__groups' } ) } />
				<p className="luffman-config__summary" aria-live="polite"></p>
				<p className="luffman-config__note"></p>
				{ ! RichText.isEmpty( attributes.price ) &&
					<RichText.Content tagName="p" className="luffman-config__price" value={ attributes.price } />
				}
				<a className="luffman-config__cta wp-element-button" href={ attributes.ctaUrl }>{ attributes.ctaLabel }</a>
			</div>
		</div>
	);
}
